import React, { useEffect, useState } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import axios from 'axios';

function App() {

  let [data, setData] = useState(null);
  let [req, setReq] = useState(null);
  let [response, setResponse] = useState({});
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      console.log('data', data)
    }
  }, [data]);


  let callApi = async (requestParams) => {
    setData(null);
    setResponse({});

    try {
      setLoading(true);
      let url = requestParams.url;
      let reqMethod = requestParams.method;

      if (reqMethod === 'GET') {
        response = await axios.get(url);
      }

      if (reqMethod === 'POST') {
        let reqBody = requestParams.body
        console.log('post method', reqBody)

      }

      if (reqMethod === 'PUT') {
        let reqBody = requestParams.body
        console.log('put method', reqBody)
      }

      if (reqMethod === 'DELETE') {
        console.log('delete method')
      }

      data = response;
      setResponse(response);
      setData(data);
      setLoading(false);

      // console.log(data)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {loading ? 'loading...' : !data ? '' : data.config.method}</div>
      <div>URL: {loading ? 'loading...' :  !data ? '' : data.config.url}</div>
      <Form req={req} setReq={setReq} handleApiCall={callApi} setLoading={setLoading}/>
      <div style={{marginBottom:'auto'}}>
        <h2>Data from API</h2>
        {/* display loading if loading is true */}
        { loading ? <h3 style={{fontStyle:'italic'}}>Loading...</h3> : ''}
        
        {/* display data if data is not null */}
        { !loading && data ? <Results data={data} /> : 'No Current Data'}
        </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
