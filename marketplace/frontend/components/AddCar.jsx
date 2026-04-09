import { useState } from 'react'
import axios from 'axios'

function AddCar() {
  // Perustiedot
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [yearModel, setYearModel] = useState('')
  const [mileage, setMileage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [color, setColor] = useState('')
  const [driveType, setDriveType] = useState('')
  const [engine, setEngine] = useState('')
  const [gearbox, setGearbox] = useState('')

  // Tekniset tiedot
  const [power, setPower] = useState('')
  const [topSpeed, setTopSpeed] = useState('')
  const [fuelConsumption, setFuelConsumption] = useState('')
  const [acceleration, setAcceleration] = useState('')
  const [weight, setWeight] = useState('')

  // Muuta
  const [notes, setNotes] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const basicData = {
      model: model,
      price: parseInt(price),
      image_url: imageUrl,
      year_model: parseInt(yearModel),
      mileage: parseInt(mileage),
      engine: engine,
      gearbox: gearbox,
      registration_number: regNumber,
      color: color,
      drive_type: driveType
    };


    axios.post('http://localhost:3001/api/basics', basicData)
      .then(response => {

        const newCarId = response.data.id;

        const specData = {
          car_id: newCarId,
          power: power,
          top_speed: parseInt(topSpeed),
          acceleration: acceleration,
          fuel_consumption: fuelConsumption,
          weight: weight
        };

        return axios.post('http://localhost:3001/api/specifications', specData)
      })
      .then(() => {
        alert("Julkaisu onnistui")
      })
  }

  return (
    <div>
      <h2>Lisää uusi Chevrolet ilmoitus</h2>
      <form onSubmit={handleSubmit}>
        <h3>Perustiedot</h3>
        <input type="text" placeholder="Malli" value={model} onChange={(e) => setModel(e.target.value)} />
        <input type="number" placeholder="Hinta" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Vuosimalli" value={yearModel} onChange={(e) => setYearModel(e.target.value)} />
        <input type="number" placeholder="Kilometrit" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        <input type="text" placeholder="Kuva URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input type="text" placeholder="Rekisterinumero" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
        <input type="text" placeholder="Väri" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="text" placeholder="Vetotapa" value={driveType} onChange={(e) => setDriveType(e.target.value)} />
        <input type="text" placeholder="Moottori" value={engine} onChange={(e) => setEngine(e.target.value)} />
        <input type="text" placeholder="Vaihteisto" value={gearbox} onChange={(e) => setGearbox(e.target.value)} />

        <h3>Tekniset tiedot</h3>
        <input type="text" placeholder="Teho (KW / hp)" value={power} onChange={(e) => setPower(e.target.value)} />
        <input type="number" placeholder="Huippunopeus (km/h)" value={topSpeed} onChange={(e) => setTopSpeed(e.target.value)} />
        <input type="text" placeholder="Kulutus (l/100km)" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} />
        <input type="text" placeholder="Kiihtyvyys (0-100 km/h)" value={acceleration} onChange={(e) => setAcceleration(e.target.value)} />
        <input type="text" placeholder="Paino" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <h3>Muuta</h3>
        <textarea placeholder="Lisätiedot" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button type="submit">Julkaise</button>
      </form>
    </div>
  )
}

export default AddCar

