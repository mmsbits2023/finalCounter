/*import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const DownloadFile = () => {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/counter/getcounterList');
        const jsonData = await response.json();
        setData(jsonData.data.CounterDetailsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
//download data---
  const handleOnExport = () => {
    var wb=XLSX.utils.book_new(),
    ws=XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb,ws,"MySheet1");
  
    XLSX.writeFile(wb,"MyExcel.xlsx");
   }
  const handleSearch = () => {
    // Filter data based on the search date
    const filtered = data.filter(item => item.currentDate.includes(searchDate));
    setFilteredData(filtered);
  };

  // Calculate date-wise totals
  const dateWiseTotals = filteredData.reduce((totals, item) => {
    const date = item.currentDate;
    const amount = parseInt(item.amount) || 0;
    totals[date] = (totals[date] || 0) + amount;
    return totals;
  }, {});

  return (
    <div>
      <div>
        <label htmlFor="searchDate">Search Date:</label>
        <input
          type="text"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className='data-table'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Current Date</th>
            <th>Current Time</th>
            <th>Date-wise Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item._id}>
                <td>{item.amount}</td>
                <td>{item.currentDate}</td>
                <td>{item.currentTime}</td>
                <td>{dateWiseTotals[item.currentDate]}</td>
              </tr>
              
            ))
            
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadFile;
*/

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const DownloadFile = () => {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/counter/getcounterList');
        const jsonData = await response.json();
        setData(jsonData.data.CounterDetailsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  // Calculate date-wise totals
  const dateWiseTotals = filteredData.reduce((totals, item) => {
    const date = item.currentDate;
    const amount = parseInt(item.amount) || 0;
    totals[date] = (totals[date] || 0) + amount;
    return totals;
  }, {});

  const handleSearch = () => {
    // Filter data based on the search date
    const filtered = data.filter(item => item.currentDate.includes(searchDate));
    setFilteredData(filtered);
  };

  const downloadData = () => {
    if (!filteredData.length) {
      console.error('No data to download.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Use XLSX.write to create a Blob
    const blob = XLSX.write(wb, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a Blob from the workbook
    const blobData = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Use XLSX.writeFile to trigger the download
    XLSX.writeFile(wb, `data_${searchDate}.xlsx`, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };

  return (
    <div className='data-container'>
      <div >
        <br/><br/>
        <div className='search-container'>
        <label htmlFor="searchDate">Search Date:</label>
        <input
          type="text"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button className='downloadButton' onClick={handleSearch}>Search</button><br/>
        </div>
       
        <div className='search-container'>
        <button  className='downloadButton ' onClick={downloadData}>Download</button>
  </div>
       
      </div>
      <br/><br/>
      <table className='data-table'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Current Date</th>
            <th>Current Time</th>
            <th>Date-wise Total</th>
          
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item._id}>
              <td>{item.amount}</td>
              <td>{item.currentDate}</td>
              <td>{item.currentTime}</td>
               <td>{dateWiseTotals[item.currentDate]}</td>
              </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default DownloadFile;
