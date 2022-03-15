import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function CheckinForm({ visits, handleNewVisit }) {
  const [formData, updateFormData] = useState({});

  const [waterbowls, updateWaterbowls] = useState([])
  const [dogs, updateDogs] = useState([])

  const [randomDogNoise, updateRandomDogNoise] = useState("")

  useEffect( () => {
    updateRandomDogNoise(["Woof!", "Bark!", "Arf!", "Aroof aroof aroof!", "Yowww!", "Awhooo!"].sort(function (a, b) { return 0.5 - Math.random() })[0])
  }, [])

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
        <label htmlFor="dog_id">🐶</label>
        <select required id="dog_id" name="dog" onChange={handleChange}>
          <option disabled selected value>select a dog</option>
          {dogs.map( (dog) => {
              return <option value={dog.id} key={dog.id}>{dog.name}</option>
            }
          )}
        </select>
        <br/>
        <label htmlFor="waterbowl_id">💦</label>
        <select required id="waterbowl_id" name="waterbowl" defaultValue={formData.dog_id} onChange={handleChange}>
          <option disabled selected value>select a waterbowl</option>
          {waterbowls.map( (waterbowl) => {
              return <option value={waterbowl.id} key={waterbowl.id}>{waterbowl.label}</option>
            }
          )}
        </select>
        <br/>
        <label htmlFor="comment">🗣</label>
        <input required type="text" id="comment" placeholder={randomDogNoise} onChange={handleChange} />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CheckinForm;
