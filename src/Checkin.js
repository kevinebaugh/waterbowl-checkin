import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Checkin() {
  const [formData, updateFormData] = useState({
    dog_id: 1,
    waterbowl_id: 1,
    comment: "😋"
  });

  function handleChange(event) {
    console.log(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("formData", JSON.parse(JSON.stringify(formData)))

    fetch("http://localhost:9292/waterbowl_visits",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <div className="Checkin">
      <h1>Check in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dog_id">Dog ID</label>
        <input type="text" id="dog_id" defaultValue={formData.dog_id} onChange={handleChange} />

        <label htmlFor="waterbowl_id">Waterbowl ID</label>
        <input type="text" id="waterbowl_id" defaultValue={formData.waterbowl_id} onChange={handleChange} />

        <label htmlFor="comment">Comment</label>
        <input type="text" id="comment" defaultValue={formData.comment} onChange={handleChange} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Checkin;
