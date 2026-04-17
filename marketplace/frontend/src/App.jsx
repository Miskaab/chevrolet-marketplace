import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCar from '/components/AddCar.jsx'
import Cart from '/components/Cart.jsx'
import Login from '/components/Login.jsx'
import Register from '/components/Register.jsx'
import logo from './logos/Kauppa.png'
import Background from '/components/Background.jsx'
import AdminDashboard from '/components/AdminDashboard.jsx'
import EditCar from '/components/EditCar.jsx'
import Checkout from '/components/CheckOut'
import Success from '/components/Succes'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function AdminRoute({ user, children }) {
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [cart, setCart] = useState([])

  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [maxMileage, setMaxMileage] = useState('')
  const [minYear, setMinYear] = useState('')

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

  const clearCart = () => {
    setCart([])
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/basics/${id}`)
      setCars(prevCars => prevCars.filter(car => car.BasicID !== id))
    } catch (error) {
      console.error('Virhe auton poistossa:', error)
    }
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

  useEffect(() => {
    if (!user) return

    let timeout

    const logoutUser = () => {
      alert('Sinut kirjattiin ulos')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
    }

    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        logoutUser()
      }, 10 * 60 * 1000)
    }

    const events = ['mousemove', 'keydown', 'click', 'scroll']

    events.forEach(event => window.addEventListener(event, resetTimer))
    resetTimer()

    return () => {
      clearTimeout(timeout)
      events.forEach(event => window.removeEventListener(event, resetTimer))
    }
  }, [user])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiry = payload.exp * 1000

      if (Date.now() > expiry) {
        logout()
      }
    } catch (error) {
      console.error('Virhe tokenin tarkistuksessa:', error)
      logout()
    }
  }, [])

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.model.toLowerCase().includes(search.toLowerCase())
    const matchesPrice = !maxPrice || Number(car.price) <= Number(maxPrice)
    const matchesMileage = !maxMileage || Number(car.mileage) <= Number(maxMileage)
    const matchesYear = !minYear || Number(car.year_model) >= Number(minYear)

    return matchesSearch && matchesPrice && matchesMileage && matchesYear
  })

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

              {user?.isAdmin && (
                <>
                  <NavLink to="/add-car" className={({ isActive }) => isActive ? 'active' : ''}>
                    Lisää auto
                  </NavLink>

                  <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                    Admin
                  </NavLink>
                </>
              )}
            </div>

            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="nav-right">
              <NavLink
                to="/cart"
                className={({ isActive }) => isActive ? 'active cart-link' : 'cart-link'}
              >
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
            <ProtectedRoute user={user}>
              <div className="container">
                <div className="filters">
                  <input
                    type="text"
                    placeholder="Hae mallia..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Maksimi hinta"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Maksimi km"
                    value={maxMileage}
                    onChange={(e) => setMaxMileage(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Vähintään vuosimalli"
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                  />
                </div>

                <div className="car-list">
                  {filteredCars.map(car => (
                    <div
                      key={car.BasicID}
                      onClick={() => setSelectedCar(car)}
                      className="car-card"
                    >
                      <div className="car-image">
                        <img src={car.image_url} alt={car.model} />
                      </div>
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
                          <p><b>Teho:</b> {selectedCar.Specifications.power}</p>
                          <p><b>Huippunopeus:</b> {selectedCar.Specifications.top_speed}</p>
                          <p><b>Kulutus:</b> {selectedCar.Specifications.fuel_consumption}</p>
                          <p><b>Kiihtyvyys:</b> {selectedCar.Specifications.acceleration}</p>
                          <p><b>Paino:</b> {selectedCar.Specifications.weight}</p>
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
            <AdminRoute user={user}>
              <AddCar />
            </AdminRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard cars={cars} onDelete={deleteCar} />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-car/:id"
          element={
            <AdminRoute user={user}>
              <EditCar />
            </AdminRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout cart={cart} clearCart={clearCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute user={user}>
              <Success />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  )
}

export default App