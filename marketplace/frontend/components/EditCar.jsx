import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    registration_number: '',
    engine: '',
    gearbox: '',
    mileage: '',
    year_model: '',
    drive_type: '',
    color: '',
    model: '',
    price: '',
    image_url: ''
  })

  useEffect(() => {
    axios.get(`http://localhost:3001/api/basics/${id}`)
      .then((res) => {
        setFormData({
          registration_number: res.data.registration_number || '',
          engine: res.data.engine || '',
          gearbox: res.data.gearbox || '',
          mileage: res.data.mileage || '',
          year_model: res.data.year_model || '',
          drive_type: res.data.drive_type || '',
          color: res.data.color || '',
          model: res.data.model || '',
          price: res.data.price || '',
          image_url: res.data.image_url || ''
        })
      })
      .catch((error) => {
        console.error('Virhe auton haussa:', error)
      })
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:3001/api/basics/${id}`, formData)
      navigate('/admin')
    } catch (error) {
      console.error('Virhe auton päivityksessä:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Muokkaa autoa</h2>

      <input name="registration_number" placeholder="Rekisterinumero" value={formData.registration_number} onChange={handleChange} />
      <input name="model" placeholder="Malli" value={formData.model} onChange={handleChange} />
      <input name="price" placeholder="Hinta" value={formData.price} onChange={handleChange} />
      <input name="year_model" placeholder="Vuosimalli" value={formData.year_model} onChange={handleChange} />
      <input name="mileage" placeholder="Kilometrit" value={formData.mileage} onChange={handleChange} />
      <input name="engine" placeholder="Moottori" value={formData.engine} onChange={handleChange} />
      <input name="gearbox" placeholder="Vaihteisto" value={formData.gearbox} onChange={handleChange} />
      <input name="drive_type" placeholder="Vetotapa" value={formData.drive_type} onChange={handleChange} />
      <input name="color" placeholder="Väri" value={formData.color} onChange={handleChange} />
      <input name="image_url" placeholder="Kuvan URL" value={formData.image_url} onChange={handleChange} />

      <button type="submit">Tallenna muutokset</button>
    </form>
  )
}

export default EditCar