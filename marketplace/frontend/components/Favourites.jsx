function Favorites({ favorites, removeFromFavorites, addToCart }) {
  return (
    <div className="container">
      <h1>Suosikit</h1>

      {favorites.length === 0 ? (
        <p>Ei suosikkeja vielä.</p>
      ) : (
        <div className="car-list">
          {favorites.map((car) => (
            <div key={car.BasicID} className="car-card">
              <div className="car-image">
                <img src={car.image_url} alt={car.model} />
              </div>

              <h3>{car.model} - {car.price}€</h3>

              <button onClick={() => addToCart(car)}>
                Lisää ostoskoriin
              </button>

              <button onClick={() => removeFromFavorites(car.BasicID)}>
                Poista suosikeista
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites