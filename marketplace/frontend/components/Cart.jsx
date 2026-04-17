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
                onClick={() => removeFromCart(car.BasicID)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Yhteensä: {total}€</h2>
            <button className="clear-cart-btn" onClick={clearCart}>
              Tyhjennä ostoskori
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart