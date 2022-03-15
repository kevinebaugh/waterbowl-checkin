import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function DogManagement({ dogs }) {
  const [newDogData, setNewDogData] = useState({})
  // const [updatedDogData, setUpdatedDogData] = useState({
  //   name: null
  // })

  function handleNewDogSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:9292/dogs",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newDogData)
      })
      .then(res => res.json())
  }

  function handleNewDogChange(event) {
    let newData = {...newDogData}
    newData["name"] = event.target.value
    setNewDogData(newData)
  }

  function handleUpdatedDogSubmit(event) {
    event.preventDefault()
    fetch(`http://localhost:9292/dogs/${event.target.id}`,
      {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: event.target.children[1].value})
      })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  function handleDogDelete(event) {
    fetch(`http://localhost:9292/dogs/${event.target.id}`,
      {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <>
      <h1>Dog Management</h1>
      <h2>New Dog</h2>
      <form id="newDog" onSubmit={handleNewDogSubmit} >
        <label htmlFor="name">Name:</label>
        <input required type="text" placeholder="Name" onChange={handleNewDogChange} />
        <input type="submit" value="Submit" />
      </form>
      <hr/>

      <h2>All dogs</h2>
      {dogs?.map( (dog) => {
        return (
          <form id={dog.id} key={dog.id} onSubmit={handleUpdatedDogSubmit}>
            <input type="text" disabled value={dog.id} size={dog.id.toString().length}/>
            <input type="text" defaultValue={dog.name} size="12"/>
            <input type="submit" value="Submit" />
            <span id={dog.id} onClick={handleDogDelete} className="delete-x">❌</span>
          </form>
        )
      })}
    </>
  );
}

export default DogManagement;
