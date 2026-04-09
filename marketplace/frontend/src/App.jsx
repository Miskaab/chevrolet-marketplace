import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCar from './components/AddCar'
import Cart from './components/Cart'
import Login from './components/Login'


function App() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get('')
      .then(response => {
        setCars(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Chevrolet Marketplace</h1>
      <div>
        {cars.map(car => (
          <div key={car.BasicID}>
            <img src={car.image_url} alt={car.model} />
            <h3>{car.model} - {car.price}€</h3>
            <button>Lisää ostoskoriin</button>
          </div>
        ))}
      </div>
      <div>
        <AddCar />
      </div>
    </div>
  )
}

export default App
