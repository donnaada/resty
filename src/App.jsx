import React, { useState } from 'react';

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
  let [res, setRes] = useState({});
  let [loading, setLoading] = useState(false);

  let callApi = async (requestParams) => {
    setData(null);
    setRes({});

    try {
      setLoading(true);
      let url = requestParams.url;
      let reqMethod = requestParams.method;

      if (reqMethod === 'GET') {
        res = await axios.get(url);
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

      data = res;
      setRes(res);
      setData(data);
      setLoading(false);

      console.log(data)

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
      <Results data={loading ? 'loading...' :  !data ? '' : data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
