import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function CheckinList({ visits, handleDeleteVisit }) {

  return (
    <>
    <h2>Recent waterbowl visits:</h2>
    {visits.map( (visit) => {
      return (
        <div key={visit.id}>
          <div className="visit" key={visit.id}>
            <h3>Visit ID: {visit.id} <span id={visit.id} onClick={handleDeleteVisit}>❌</span></h3>
            <h4>Dog ID: {visit.dog_id}</h4>
            <h5>Waterbowl ID: {visit.waterbowl_id}</h5>
            <h5>Comment: {visit.comment}</h5>
          </div>
        </div>
      )
    })}
    </>
  );
}

export default CheckinList;
