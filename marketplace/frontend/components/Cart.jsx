function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, car) => sum + Number(car.price), 0)

  return (
    <div className="cart-container">
      <h1>Ostoskori</h1>

      {cart.length === 0 ? (
        <p>Ostoskori on tyhjä</p>
      ) : (
        <>
          {cart.map((car) => (
            <div key={car.BasicID} className="cart-item">
              <div className="cart-item-top">
                <h3>{car.model} - {car.price}€</h3>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(car.BasicID)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <h2>Yhteensä: {total}€</h2>

          <button className="clear-cart-btn" onClick={clearCart}>
            Tyhjennä ostoskori
          </button>
        </>
      )}
    </div>
  )
}

export default Cart