import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCar from '/components/AddCar.jsx'
import Cart from '/components/Cart.jsx'
import Login from '/components/Login.jsx'
import Register from '/components/Register.jsx'
import logo from './logos/Kauppa.png'
import Background from '/components/Background.jsx'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

function App() {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const addToCart = (car) => {
    const found = cart.find(item => item.BasicID === car.BasicID)
    if (found) return
    setCart([...cart, car])
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(car => car.BasicID !== id))
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3001/api/basics')
        .then(response => {
          setCars(response.data)
        })
        .catch(error => {
          console.error('Virhe autojen haussa:', error)
        })
    }
  }, [user])

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  const clearCart = () => {
    setCart([])
  }

  useEffect(() => {
  if (!user) return

  let timeout

  const resetTimer = () => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      alert('Sinut kirjattiin ulos käyttämättömyyden vuoksi')
      logout()
    }, 10 * 60 * 1000)
  }

  const events = ['mousemove', 'keydown', 'click', 'scroll']

  events.forEach((event) => {
    window.addEventListener(event, resetTimer)
  })

  resetTimer()

  return () => {
    clearTimeout(timeout)
    events.forEach((event) => {
      window.removeEventListener(event, resetTimer)
    })
  }
}, [user])

  return (
    <div>
      <Background />

      {user && (
        <nav className="navbar">
          <div className="navbar-content">
            <div className="nav-left">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Etusivu
              </NavLink>

              <NavLink to="/add-car" className={({ isActive }) => isActive ? 'active' : ''}>
                Lisää auto
              </NavLink>
            </div>

            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="nav-right">
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'active cart-link' : 'cart-link'}>
                Ostoskori
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </NavLink>

              <button onClick={logout}>
                Kirjaudu ulos ({user.username})
              </button>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="container">
                <div className="car-list">
                  {cars.map(car => (
                    <div
                      key={car.BasicID}
                      onClick={() => setSelectedCar(car)}
                      className="car-card"
                    >
                      <img src={car.image_url} alt={car.model} />
                      <h3>{car.model} - {car.price}€</h3>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(car)
                        }}
                      >
                        Lisää ostoskoriin
                      </button>
                    </div>
                  ))}
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
                          <p><b>Teho:</b> {selectedCar.Specifications?.power}</p>
                          <p><b>Huippunopeus:</b> {selectedCar.Specifications?.top_speed}</p>
                          <p><b>Kulutus:</b> {selectedCar.Specifications?.fuel_consumption}</p>
                          <p><b>Kiihtyvyys:</b> {selectedCar.Specifications?.acceleration}</p>
                          <p><b>Paino:</b> {selectedCar.Specifications?.weight}</p>
                        </div>

                        <div className="details-section">
                          <h3>Muuta</h3>
                          <p>{selectedCar.Features?.[0]?.notes || 'Ei lisätietoja'}</p>
                        </div>
                      </div>

                      <button className="close-btn" onClick={() => setSelectedCar(null)}>
                        Sulje
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart}/>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  )
}

export default App