import React, { useState} from 'react'
import Card from 'react-bootstrap/Card'  
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Form } from 'react-bootstrap'




const AmountDate= () => {

 

  const navigate = useNavigate();
  const [data, setData] = useState({
          amount:''
  });
  const handleInput = (event) => { 
      setData({...data,[event.target.name]:event.target.value})
  }
  //const [errors, setErrors] = useState('');
  const handleSubmit = async (e) => { 
      e.preventDefault();
     /* const validationErrors = {}
      if (!data.date) {
          validationErrors.date = "date is required"
      } 
      
      if (!data.amount) {
          validationErrors.amount = 'amount is required'
      } 
      setErrors(validationErrors);*/

     // if (Object.keys(validationErrors).length === 0) {
          const { amount } = data;
          const response = await fetch("http://localhost:5001/counter/saveCounterList", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  //date: date,
                 
                  amount: amount
              })
          });
          const result = await response.json();
          if (result.status === 422 || !data) {
              window.alert("Inavalid data");
              console.log("Inavalid data");
          }
          else {
              window.alert("Added Successfully");
              console.log("Successfully Added");
              navigate('/allDataList');
        
          
          }
    //  }
  }
  
    
  return (
    <div>
      <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <div className=" row justify-content-center">
          <div className="col-md-6 col-lg-2 col-xl-6 col-sm-12">
            {/* <CCard className="m-0"> */}
            <Card.Body className="p-0 ">
            <section className="w-full mx-auto items-center justify-center ">
                             <Form onSubmit={handleSubmit} className="shadow pt-2">
                            
                       {/*<div className="mb-1 register " style={{width:"70%",textAlign:"center",marginLeft:"100px"}}>             
                    <label htmlFor="dateId" className="form-label">
                    Date</label>
                      <input type="text" name="date" className="form-control" id="dateId" //autocomplete="off"
                 onChange={handleInput}/>
                  {errors.date && <span className='errorData'>{ errors.date}</span> }
  </div>*/}
                                  
            <div className="mb-1 register "style={{width:"70%",textAlign:"center",marginLeft:"100px"}}>
                <label htmlFor="amountId" className="form-label">
                    Amount</label>
                      <input type="text" name="amount" className="form-control " id="amountId" //autocomplete="off"
                         onChange={handleInput} />
                          {/*errors.amount && <span className='errorData'>{ errors.amount}</span> */}
                         </div>
                      <button type="submit" className="btn btn-primary button "
                      style={{ width: "30%", textAlign: "center", marginLeft: "200px" }}>
                    Add
                   </button>             
                             </Form>     
                              </section>
                          </Card.Body>
                      </div>
                  </div>
              </Container>
          </div>
    </div>
  )
}

export default AmountDate

