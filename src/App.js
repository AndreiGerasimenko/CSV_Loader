import React, { useState, useEffect } from 'react'
import { Alert, Typography, Input } from 'antd'
import Papa from 'papaparse'
import { TableWrapper } from "./components/TableWrapper"
import { checkRequiredFields } from './functions/checkRequiredFields'
import 'antd/dist/antd.css';


import './App.css';

const requiredFields = ["Full Name", "Phone", "Email"];

function App() {

  const [csvFile, setcsvFile] = useState(undefined);
  const [isAlertSown, setAlertShown] = useState(false);
  const [parsingResult, setParsingresult] = useState(null);

  const handleChange = (event) => {

    const file = event.target.files[0];

    if(!file) {
      setAlertShown(false);
      setParsingresult(null);
      setcsvFile(undefined);
      return;
    }

    if(file.name.slice(-4) !== '.csv') {
      setAlertShown(true);
      setcsvFile(undefined);
      setParsingresult(null);
      return;
    }
    setcsvFile(file);
    setAlertShown(false);
  }

  const updateData = (results) => {
    if(results.errors.length) {
      setAlertShown(true);
      setParsingresult(null);
      return;
    }

    if(!checkRequiredFields(requiredFields, results.meta.fields)) {
      setAlertShown(true);
      setParsingresult(null);
      return;
    }

    setParsingresult(results);
  }

  useEffect(() => {
    if(!csvFile) return;

    Papa.parse(csvFile, {
      complete: updateData,
      header: true
    })

  }, [csvFile])

  return (
    <div className='App'>
      <Typography.Title 
        level={1}
        style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        Import CSV file
      </Typography.Title>

      <Input
        type='file'
        placeholder='Select SVG file'
        onChange={handleChange}
      />
      
      {
        parsingResult ? <TableWrapper parsingResult={parsingResult} /> :
        isAlertSown && 
        <Alert 
          type='error' 
          message='File format is not correct'
          style={{ fontSize: '20px',
                   textAlign: 'center'
                }}
        />
      }
    </div>
  );
}

export default App;
