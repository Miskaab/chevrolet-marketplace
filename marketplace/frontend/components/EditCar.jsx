import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    registration_number: '',
    model: '',
    price: '',
    year_model: '',
    mileage: '',
    engine: '',
    gearbox: '',
    drive_type: '',
    color: '',
    image_url: ''
  })

  const [specs, setSpecs] = useState({
    power: '',
    top_speed: '',
    acceleration: '',
    fuel_consumption: '',
    weight: ''
  })

  const [features, setFeatures] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/basics')
      .then((res) => {
        const car = res.data.find((c) => String(c.BasicID) === String(id))

        if (!car) return

        setFormData({
          registration_number: car.registration_number || '',
          model: car.model || '',
          price: car.price || '',
          year_model: car.year_model || '',
          mileage: car.mileage || '',
          engine: car.engine || '',
          gearbox: car.gearbox || '',
          drive_type: car.drive_type || '',
          color: car.color || '',
          image_url: car.image_url || ''
        })

        setSpecs({
          power: car.Specifications?.[0]?.power || '',
          top_speed: car.Specifications?.[0]?.top_speed || '',
          acceleration: car.Specifications?.[0]?.acceleration || '',
          fuel_consumption: car.Specifications?.[0]?.fuel_consumption || '',
          weight: car.Specifications?.[0]?.weight || ''
        })

        setFeatures(car.Features?.[0]?.notes || '')
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

  const handleSpecsChange = (e) => {
    setSpecs({
      ...specs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:3001/api/basics/${id}`, formData)

      await axios.put(`http://localhost:3001/api/specifications/${id}`, specs)

      await axios.put(`http://localhost:3001/api/features/${id}`, {
        notes: features
      })

      navigate('/admin')
    } catch (error) {
      console.error('Virhe auton päivityksessä:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Muokkaa autoa</h2>

      <h3>Perustiedot</h3>

      <input
        name="registration_number"
        placeholder="Rekisterinumero"
        value={formData.registration_number}
        onChange={handleChange}
      />

      <input
        name="model"
        placeholder="Malli"
        value={formData.model}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Hinta"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="year_model"
        placeholder="Vuosimalli"
        value={formData.year_model}
        onChange={handleChange}
      />

      <input
        name="mileage"
        placeholder="Kilometrit"
        value={formData.mileage}
        onChange={handleChange}
      />

      <input
        name="engine"
        placeholder="Moottori"
        value={formData.engine}
        onChange={handleChange}
      />

      <input
        name="gearbox"
        placeholder="Vaihteisto"
        value={formData.gearbox}
        onChange={handleChange}
      />

      <input
        name="drive_type"
        placeholder="Vetotapa"
        value={formData.drive_type}
        onChange={handleChange}
      />

      <input
        name="color"
        placeholder="Väri"
        value={formData.color}
        onChange={handleChange}
      />

      <input
        name="image_url"
        placeholder="Kuvan URL"
        value={formData.image_url}
        onChange={handleChange}
      />

      <h3>Tekniset tiedot</h3>

      <input
        name="power"
        placeholder="Teho"
        value={specs.power}
        onChange={handleSpecsChange}
      />

      <input
        name="top_speed"
        placeholder="Huippunopeus"
        value={specs.top_speed}
        onChange={handleSpecsChange}
      />

      <input
        name="acceleration"
        placeholder="Kiihtyvyys"
        value={specs.acceleration}
        onChange={handleSpecsChange}
      />

      <input
        name="fuel_consumption"
        placeholder="Kulutus"
        value={specs.fuel_consumption}
        onChange={handleSpecsChange}
      />

      <input
        name="weight"
        placeholder="Paino"
        value={specs.weight}
        onChange={handleSpecsChange}
      />

      <h3>Lisätiedot</h3>

      <textarea
        placeholder="Lisätiedot"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />

      <button type="submit">Tallenna muutokset</button>
    </form>
  )
}

export default EditCar