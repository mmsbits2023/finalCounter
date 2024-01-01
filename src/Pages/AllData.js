import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const AllData = () => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/counter/getcounterList'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const jsonData = await response.json();
        setData(jsonData.data.CounterDetailsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 const handleOnExport = () => {
  var wb=XLSX.utils.book_new(),
  ws=XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb,ws,"MySheet1");

  XLSX.writeFile(wb,"MyExcel.xlsx");
 }
 // Calculate the total amount
 const totalAmount = data.reduce((total, item) => {
  const amount = parseInt(item.amount);
  return isNaN(amount) ? total : total + amount;
}, 0)

const handleSearch = () => {
  // Filter data based on the search date
  const filtered = data.filter(item => item.currentDate.includes(searchDate));
  setFilteredData(filtered);
};

 return (
    <div>
      <h2>Data Table{totalAmount}</h2>
      <div>
        <label htmlFor="searchDate">Search Date:</label>
        <input
          type="text"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button className='downloadButton' onClick={handleSearch}>Search</button>
      </div>
      <br/><br/>
      <div className='mb-3'>
       <button className=' downloadButton '
       onClick={handleOnExport}
       >Download</button> 
      </div>
      {/*<table className='data-table' >
        <thead>
          <tr>
            <th>Amount</th>
            <th>Current Date</th>
            <th>Current Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.amount}</td>
              <td>{item.currentDate}</td>
              <td>{item.currentTime}</td>
            </tr>
          ))}
        </tbody>
        <tr>
          <th>Total</th>
          <td>{totalAmount}</td>
        </tr>
          </table>*/}
           <table className='data-table'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Current Date</th>
            <th>Current Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item._id}>
                <td>{item.amount}</td>
                <td>{item.currentDate}</td>
                <td>{item.currentTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default AllData;
