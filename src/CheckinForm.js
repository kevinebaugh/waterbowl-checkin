import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function CheckinForm({ visits, handleNewVisit }) {
  const [formData, updateFormData] = useState({
    dog_id: "1",
    waterbowl_id: "null",
    comment: "😋"
  });

  const [waterbowls, updateWaterbowls] = useState([])
  const [dogs, updateDogs] = useState([])


  useEffect(() => {
    fetch('http://localhost:9292/waterbowls')
      .then(response => response.json())
      .then(waterbowlData => {
        updateWaterbowls(waterbowlData)
      })

    fetch('http://localhost:9292/dogs')
      .then(response => response.json())
      .then(dogData => {
        updateDogs(dogData)
      })
  }, [])

  function handleChange(event) {
    let newData = {...formData}
    newData[event.target.id] = event.target.value

    updateFormData(newData)
    console.log("formData", formData)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("formData", JSON.parse(JSON.stringify(formData)))

    handleNewVisit(formData)
  }

  return (
    <div className="CheckinForm">
      <h2>New check in:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dog_id">🐶 Dog:</label>
        <select id="dog_id" name="dog" onChange={handleChange}>
          {dogs.map( (dog) => {
              return <option value={dog.id} key={dog.id}>{dog.name}</option>
            }
          )}
        </select>
        <br/>
        <label htmlFor="waterbowl_id">💦 Waterbowl:</label>
        <select id="waterbowl_id" name="waterbowl" onChange={handleChange}>
          {waterbowls.map( (waterbowl) => {
              return <option value={waterbowl.id} key={waterbowl.id}>{waterbowl.label}</option>
            }
          )}
        </select>
        <br/>
        <label htmlFor="comment">🗣 Comment:</label>
        <input type="text" id="comment" defaultValue={formData.comment} onChange={handleChange} />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CheckinForm;
