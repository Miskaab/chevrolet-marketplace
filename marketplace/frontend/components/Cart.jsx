import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart({ cart, removeFromCart, clearCart }) {
  const navigate = useNavigate()
  const [removingId, setRemovingId] = useState(null)

  const total = cart.reduce((sum, car) => sum + Number(car.price), 0)

  const handleRemove = (id) => {
    setRemovingId(id)

    setTimeout(() => {
      removeFromCart(id)
      setRemovingId(null)
    }, 250)
  }

  return (
    <div className="cart-container">
      <h1>Ostoskori</h1>

      {cart.length === 0 ? (
        <p>Ostoskori on tyhjä</p>
      ) : (
        <>
          {cart.map((car) => (
            <div
              key={car.BasicID}
              className={`cart-item ${removingId === car.BasicID ? 'removing' : ''}`}
            >
              <div className="cart-item-left">
                <div className="cart-item-image">
                  <img src={car.image_url} alt={car.model} />
                </div>

                <div className="cart-item-info">
                  <h3>{car.model}</h3>
                  <p>Vuosimalli: {car.year_model}</p>
                  <p>Kilometrit: {car.mileage} km</p>
                  <p className="cart-price">{car.price}€</p>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(car.BasicID)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Yhteensä: {total}€</h2>

            <div className="cart-summary-buttons">
              <button className="clear-cart-btn" onClick={clearCart}>
                Tyhjennä ostoskori
              </button>

              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Siirry kassalle
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart