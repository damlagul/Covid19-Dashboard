import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, CardContent, FormControl, Select, MenuItem } from '@material-ui/core';
import InfoBox from './components/InfoBox'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import Table from './components/Table'
import {sortedData} from './components/util'
import "leaflet/dist/leaflet.css"
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");


  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then ((response) => (response.json()))
      .then ((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setCountries(countries);
        setMapCountries(data);
        const sorted = sortedData(data);
        setTableData(sorted);
      });
    };
    getCountries();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
      setMapZoom(10);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>Covid-19 Dashboard</h1>
          {/* Title + Select input dropdown fielld */}

          <FormControl className="app-dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              {/* <MenuItem value="A">A</MenuItem> */}

              {/* loop through all the countries and show tem in the dropdown */}
              <MenuItem key= "worldwide" value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem key={`${country.value !== null ? country.value : Math.random()*1000} `} value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox cases={countryInfo.todayCases} total={countryInfo.cases} title="Coronavirus Cases" />
          <InfoBox cases={countryInfo.todayRecovered} total={countryInfo.recovered} title="Recovered"/>
          <InfoBox cases={countryInfo.todayDeaths} total={countryInfo.deaths} title="Deaths"/>
        </div>

        {/* Map */}
        <Map countries={mapCountries} casesType={casesType}center={mapCenter} zoom={mapZoom}/>    
      </div>
 
      <Card className="app__right">
        <CardContent>
              <h2>live cases by country</h2>
              {/* Table */}
              <Table countries={tableData}/>
              <h3>worldwide new cases</h3>
              {/* Graph */}
              <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
