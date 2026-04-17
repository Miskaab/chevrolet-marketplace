import { NavLink } from 'react-router-dom'

function AdminDashboard({ cars, onDelete }) {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="admin-list">
        {cars.map((car) => (
          <div key={car.BasicID} className="admin-card">
            <img src={car.image_url} alt={car.model} />
            <h3>{car.model}</h3>
            <p>{car.price}€</p>

            <div className="admin-actions">
              <NavLink to={`/edit-car/${car.BasicID}`} className="edit-btn">
                Muokkaa
              </NavLink>

              <button className="delete-btn" onClick={() => onDelete(car.BasicID)}>
                Poista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard