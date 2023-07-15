import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
// import JsonView from '@uiw/react-json-view';
import Results from './Components/Results';
import History from './Components/History';

export const initialState = {
  data: null,
  loading: false,
  history: [],
}

export const dataReducer = (state=initialState, action) => {
  switch(action.type){
    case 'ADD':
      return {
        ...state, 
        data: action.payload}
    case 'LOADING':
      return {...state, 
       loading: action.payload}
    case 'HISTORY':
      return {...state,
        history: [...state.history, action.payload]}
    default:
      return state;
  }
}

function App() {
  const [request, setRequestParams] = useState({});
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    console.log('Event Changed');
  },[]);

  useEffect(() => {
    try{
      dispatch({type: 'LOADING', payload: true });

      const getData = async () => {
        if(request.method === 'GET'){
          let response = await axios.get(request.url);
          dispatch({type: 'ADD', payload: response.data });

          let historyData = [request, response.data];
          dispatch({type: 'HISTORY', payload: historyData });
        }

      }

      if(request.method && request.url){
        getData();
        dispatch({type: 'LOADING', payload: false });
      }

    } catch {

      dispatch({type: 'ADD', payload: 'no data available' });
      dispatch({type: 'LOADING', payload: false });
    }
  }, [request])
  
  const callApi = (request) => {
    setRequestParams(request);
  }

  const historyClickHandler = (results) => {
    dispatch({type: 'ADD', payload: results})
  }

  return (
    <>
      <Header />
      <div className="container">
        <div>Request Method: {request.method}</div>
        <div>URL: {request.url}</div>
        <Form handleApiCall={callApi}/>
        <History history={state.history} historyClickHandler={historyClickHandler}/>
        <div style={{marginBottom:'auto'}}>
          <h2>Data from API</h2>
          {/* display loading if loading is true */}
          { state.loading && request.data ? <h3 style={{fontStyle:'italic'}}>Loading...</h3> : ''}
        
          {/* display data if data is not null */}
          { state.data ? <Results data={state.data}/> : 'No Current Data'}
          </div>
      </div>
      
      <Footer /> 
      </>
  );
}

export default App;
