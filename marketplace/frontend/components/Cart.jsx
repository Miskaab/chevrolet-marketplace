import { useState } from 'react'
import axios from 'axios'

function Cart({ cart, removeFromCart }) {
  const totalPrice = cart.reduce((sum, car) => sum + car.price, 0)

  return (
    <div>
      <h2>Ostoskori</h2>

      {cart.length === 0 ? (
        <p>Ostoskori on tyhjä</p>
      ) : (
        <div>
          {cart.map(car => (
            <div key={car.BasicID}>
              <p>{car.model} - {car.price}€</p>
              <button onClick={() => removeFromCart(car.BasicID)}>
                Poista
              </button>
            </div>
          ))}

          <h3>Yhteensä: {totalPrice}€</h3>
        </div>
      )}
    </div>
  )
}

export default Cart