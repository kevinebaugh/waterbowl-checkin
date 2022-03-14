import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function CheckinList({ visits }) {

  return (
    visits.map( (visit) => {
      return (
        <>
          <h2>Recent waterbowl visits:</h2>
          <p key={visit.id}>
            <h3>Visit ID: {visit.id}</h3>
            <h4>Dog ID: {visit.dog_id}</h4>
            <h5>Waterbowl ID: {visit.waterbowl_id}</h5>
            <h5>Comment: {visit.comment}</h5>
            <hr/>
          </p>
        </>
      )
    })
  );
}

export default CheckinList;
