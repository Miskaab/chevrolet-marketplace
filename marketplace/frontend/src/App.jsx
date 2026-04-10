import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCar from '/components/AddCar.jsx'
import Cart from '/components/Cart.jsx'
import Login from '/components/Login.jsx'
import './index.css'


function App() {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/api/basics')
      .then(response => {
        setCars(response.data)
      })
  }, [])


  return (
    <div>
      <h1>Chevrolet Marketplace</h1>

      <div>
        {cars.map(car => (
          <div
            key={car.BasicID}
            onClick={() => setSelectedCar(car)}
            className="car-card"
          >
            <img src={car.image_url} alt={car.model} width="400" />
            <h3>{car.model} - {car.price}€</h3>
            <button>Lisää ostoskoriin</button>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCar.image_url} alt={selectedCar.model} width="500" />
            <h2>{selectedCar.model}</h2>
            <p>Hinta: {selectedCar.price}€</p>
            <p>Vuosimalli: {selectedCar.year_model}</p>
            <p>Mittarilukema: {selectedCar.mileage} km</p>
            <p>Moottori: {selectedCar.engine}</p>
            <p>Vaihteisto: {selectedCar.gearbox}</p>
            <p>Väri: {selectedCar.color}</p>
            <p>Vetotapa: {selectedCar.drive_type}</p>

            <button onClick={() => setSelectedCar(null)}>Sulje</button>
          </div>
        </div>
      )}

      <AddCar />
    </div>
  )
}



export default App
