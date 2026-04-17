function AdminDashboard({ cars, onDelete }) {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {cars.map((car) => (
        <div key={car.BasicID} className="cart-item">
          <h3>{car.model} - {car.price}€</h3>

          <button onClick={() => onDelete(car.BasicID)}>
            Poista
          </button>
        </div>
      ))}
    </div>
  )
}

export default AdminDashboard