import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCar from '/components/AddCar.jsx'
import Cart from '/components/Cart.jsx'
import Login from '/components/Login.jsx'
import './index.css'


function App() {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [cart, setCart] = useState([])

  const addToCart = (car) => {
    const found = cart.find(item => item.BasicID === car.BasicID)
    if (found) return
    setCart([...cart, car])
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(car => car.BasicID !== id))
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/basics')
      .then(response => {
        setCars(response.data)
      })
  }, [])


  return (
    <div>
      <h1 className='title'>Chevrolet Marketplace</h1>

      <div className='container'>
        <div className='car-list'>
          {cars.map(car => (
            <div key={car.BasicID} onClick={() => setSelectedCar(car)} className="car-card">
              <img src={car.image_url} alt={car.model} />
              <h3>{car.model} - {car.price}€</h3>
              <button onClick={() => addToCart(car)}>
                Lisää ostoskoriin
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedCar && (
        <div className="overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <img src={selectedCar.image_url} alt={selectedCar.model} width="500" />
            <h2>{selectedCar.model}</h2>
            <div className='details-container'>
              <div className='details-section'>
                <h3>Perustiedot</h3>
                <p>Hinta: {selectedCar.price}€</p>
                <p>Vuosimalli: {selectedCar.year_model}</p>
                <p>Mittarilukema: {selectedCar.mileage} km</p>
                <p>Moottori: {selectedCar.engine}</p>
                <p>Vaihteisto: {selectedCar.gearbox}</p>
                <p>Väri: {selectedCar.color}</p>
              </div>
              <div className='details-section'>
                <h3>Tekniset tiedot</h3>
                <p>Vetotapa: {selectedCar.drive_type}</p>
                <p>Teho: {selectedCar.Specifications.power}</p>
                <p>Huippunopeus: {selectedCar.Specifications.top_speed}</p>
                <p>Kulutus: {selectedCar.Specifications.fuel_consumption}</p>
                <p>Kiihtyvyys: {selectedCar.Specifications.acceleration}</p>
                <p>Paino: {selectedCar.Specifications.weight}</p>
              </div>
              <div className='details-section'>
                <h3>Muuta</h3>
                <p>Lisätiedot: {selectedCar.Features.notes}</p>
              </div>
            </div>

            <button onClick={() => setSelectedCar(null)}>Sulje</button>
          </div>
        </div>
      )}
      <AddCar />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  )
}



export default App
