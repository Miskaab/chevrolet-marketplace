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

  //Morjesta anozio

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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCar.image_url} alt={selectedCar.model} />

            <h2 className="car-title">{selectedCar.model}</h2>

            <div className="details-container">

              <div className="details-section">
                <h3>Perustiedot</h3>
                <p><b>Hinta:</b> {selectedCar.price}€</p>
                <p><b>Vuosimalli:</b> {selectedCar.year_model}</p>
                <p><b>Kilometrit:</b> {selectedCar.mileage} km</p>
                <p><b>Moottori:</b> {selectedCar.engine}</p>
                <p><b>Vaihteisto:</b> {selectedCar.gearbox}</p>
                <p><b>Väri:</b> {selectedCar.color}</p>
              </div>

              <div className="details-section">
                <h3>Tekniset</h3>
                <p><b>Vetotapa:</b> {selectedCar.drive_type}</p>
                <p><b>Teho:</b> {selectedCar.Specifications?.[0]?.power}</p>
                <p><b>Huippunopeus:</b> {selectedCar.Specifications?.[0]?.top_speed}</p>
                <p><b>Kulutus:</b> {selectedCar.Specifications?.[0]?.fuel_consumption}</p>
                <p><b>Kiihtyvyys:</b> {selectedCar.Specifications?.[0]?.acceleration}</p>
                <p><b>Paino:</b> {selectedCar.Specifications?.[0]?.weight}</p>
              </div>

              <div className="details-section">
                <h3>Muuta</h3>
                <p>{selectedCar.Features?.[0]?.notes || "Ei lisätietoja"}</p>
              </div>

            </div>

            <button className="close-btn" onClick={() => setSelectedCar(null)}>
              Sulje
            </button>
          </div>
        </div>
      )}
      <AddCar />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  )
}



export default App
