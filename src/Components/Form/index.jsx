import React, { useState } from 'react';

import './Form.scss';

function Form(props) {

  let [url, setUrl] = useState('');
  let [method, setMethod] = useState('GET');
  let [body, setBody] = useState('');

  const handleSubmit = e => {
    method = method.toUpperCase();
    e.preventDefault();
    props.setLoading(true);
    const formData = {
      method: method,
      url: url,
      body: body
    };
    console.log(formData);
    props.handleApiCall(formData);
  }

  const handleMethodSelect = (e) => {
    setMethod(e.target.id.toUpperCase());
  }

  /**
   * Test APIs
      https://pokeapi.co/api/v2/pokemon
      https://swapi.dev/api/people/1/
      https://rickandmortyapi.com/api/character
   */


  return (
    <>
      <form data-testid='form' onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' data-testid='input' onChange={(e) => setUrl(e.target.value.trim())} required />
          <button data-testid="button" type="submit">GO!</button>
        </label>
        <label className="methods">
          <span data-testid="get" id="get" className={method === 'GET' ? 'active' : ''} onClick={handleMethodSelect}>GET</span>
          <span id="post" className={method === 'POST' ? 'active' : ''} onClick={handleMethodSelect}>POST</span>
          <span id="put" className={method === 'PUT' ? 'active' : ''} onClick={handleMethodSelect}>PUT</span>
          <span id="delete" className={method === 'DELETE' ? 'active' : ''} onClick={handleMethodSelect}>DELETE</span>
        </label>

      {
        method === 'POST' || method === 'PUT' ? <textarea name="body" id="body" cols="30" rows="10" placeholder="Raw JSON Body" onChange={(e)=> setBody(e.target.value)}></textarea> : ''
      }
      </form>
    </>
  );
}

export default Form;
