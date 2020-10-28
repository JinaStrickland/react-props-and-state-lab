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

  componentDidMount () {
    fetch('/api/pets')
    .then(res => res.json())
    .then(pets => {
      this.setState({
        pets: pets
      })
    })
  }

  onAdoptPet = (id) => {
    let newPetArray = this.state.pets.map(pet => {
      if(pet.id === id) {
        // console.log(pet)
        return {...pet, isAdopted: true}
      } else {
        return pet 
      }
    })
    // console.log(newPetArray)
    this.setState({  
      pets: newPetArray 
    }) 
  }

  onFindPetsClick = (type) => {
    console.log(type)
  }

  onChangeType = () => {
    // fetch request
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
