import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (animalType) => {
    // console.log(animalType)
    this.setState({
      filters: {
        type: animalType
      }
    })
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    if(this.state.filters.type === "all") {
      fetch(url)
      .then(res => res.json())
      .then( filteredPets => this.setState({
        pets: filteredPets
      }) )
    } else {
      fetch(url + `?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(filteredPets => this.setState({
        pets: filteredPets
      }))
    }
  }

  onAdoptPet = (id) => {

    // let petState = [...this.state.pets]
    // let petToFind = petState.find(pet => pet.id == id)
    // petToFind.isAdopted = true
    // this.setState({
    //   pets: petState 
    // })

    let newPetArray = [...this.state.pets.map(pet => {
      if(pet.id === id) {
        // console.log(pet)
        return {...pet, isAdopted: true}
      } else {
        return pet 
      }
    })]
    // console.log(newPetArray)
    this.setState({  
      pets: newPetArray 
    }) 
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={ this.onFindPetsClick } 
                        onChangeType={ this.onChangeType }/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={ this.state.pets }
                          onAdoptPet={ this.onAdoptPet } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
