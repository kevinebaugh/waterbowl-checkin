import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar'
import CheckinForm from './CheckinForm'
import CheckinList from './CheckinList'
import DogManagement from './DogManagement'

function App() {
  const [visits, updateVisits] = useState([])
  const [dogs, updateDogs] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/waterbowl_visits')
      .then(response => response.json())
      .then(visitData => {
        updateVisits(visitData)
      })
  }, [visits])

  useEffect(() => {
    fetch('http://localhost:9292/dogs')
      .then(response => response.json())
      .then(dogData => {
        updateDogs(dogData)
      })
  }, [dogs])

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

  function handleDeleteVisit(event) {
    fetch(`http://localhost:9292/waterbowl_visits/${event.target.id}`,
      {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(json => console.log(json))

  }

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/checkins">
            <h1>Waterbowl Checkins</h1>
            <CheckinForm visits={visits} handleNewVisit={handleNewVisit} />
            <hr/>
            <CheckinList visits={visits} handleDeleteVisit={handleDeleteVisit} />
          </Route>
          <Route exact path="/dogs">
            <DogManagement dogs={dogs}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
