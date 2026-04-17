import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const total = cart.reduce((sum, car) => sum + Number(car.price), 0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearCart()
    navigate('/success')
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h1>Kassa</h1>

        <input
          type="text"
          name="name"
          placeholder="Nimi"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Sähköposti"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Puhelin"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Osoite"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <h2>Yhteensä: {total}€</h2>

        <button type="submit" className="checkout-btn">
          Vahvista tilaus
        </button>
      </form>
    </div>
  )
}

export default Checkout