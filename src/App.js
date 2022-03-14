import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CheckinForm from './CheckinForm'
import CheckinList from './CheckinList'

function App() {
  const [visits, updateVisits] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/waterbowl_visits')
      .then(response => response.json())
      .then(visitData => {
        updateVisits(visitData)
      })
  },)

  function handleNewVisit(visit) {
    fetch("http://localhost:9292/waterbowl_visits",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(visit)
      })
      .then(res => res.json())
      .then(json => console.log(json))
    updateVisits(
      [...visits, visit]
    )
  }

  return (
    <>
      <h1>Waterbowl Checkins</h1>
      <CheckinForm visits={visits} handleNewVisit={handleNewVisit} />
      <hr/>
      <CheckinList visits={visits} />
    </>
  );
}

export default App;
