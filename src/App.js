import React from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';


function App() {
  return (
    <div className="app">
      <div class="app__header">
        <h1>Covid-19 Dashboard</h1>
        
        <FormControl className="app-dropdown">
          <Select 
            variant="outlined"
            value="abc"
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown fielld */}

      {/* info boxes */}
      {/* info boxes */}
      {/* info boxes */} 
      {/* info boxes */} 

      {/* info boxes */}
      {/* info boxes */}
      {/* info boxes */} 
      {/* info boxes */} 

      {/* Table */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
