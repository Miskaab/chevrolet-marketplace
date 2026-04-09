import { useState } from 'react'
import axios from 'axios'

function AddCar() {

  // Perustiedot (Basic-taulu)

  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [yearModel, setYearModel] = useState('')
  const [mileage, setMileage] = useState('')
  const [engine, setEngine] = useState('')
  const [gearbox, setGearbox] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [color, setColor] = useState('')
  const [driveType, setDriveType] = useState('')

  // Tekniset tiedot (Specification-taulu)

  const [power, setPower] = useState('')
  const [acceleration, setAcceleration] = useState('')
  const [topSpeed, setTopSpeed] = useState('')
  const [fuelConsumption, setFuelConsumption] = useState('')

  // Lisätiedot (Feature-taulu)

  const [notes, setNotes] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Luodaan data-objekti, joka sisältää kaiken

    const carData = {
      model,
      price: parseInt(price),
      image_url: imageUrl,
      year_model: parseInt(yearModel),
      mileage: parseInt(mileage),
      engine: engine,
      gearbox: gearbox,
      registration_number: regNumber,
      color: color,
      drive_type: driveType,

      specs: {
        power,
        top_speed: parseInt(topSpeed),
        acceleration: acceleration,
        fuel_consumption: fuelConsumption
      },
      features: {
        notes
      }
    }

    axios.post('http://localhost:3001/api/basics/', carData)
      .then(response => {
      })
  }

  return (
    <div>
      <h2>Lisää uusi Chevrolet ilmoitus</h2>
      <form onSubmit={handleSubmit}>

        <h3>Perustiedot</h3>
        <input type="text" placeholder="Malli" value={model} onChange={(event) => setModel(event.target.value)} />
        <input type="number" placeholder="Hinta" value={price} onChange={(event) => setPrice(event.target.value)} />
        <input type="number" placeholder="Vuosimalli" value={yearModel} onChange={(event) => setYearModel(event.target.value)} />
        <input type="number" placeholder="Kilometrit" value={mileage} onChange={(event) => setMileage(event.target.value)} />
        <input type="text" placeholder="Kuva URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
        <input type="text" placeholder="Rekisterinumero" value={regNumber} onChange={(event) => setRegNum(event.target.value)} />
        <input type="text" placeholder="Väri" value={color} onChange={(event) => setColor(event.target.value)} />
        <input type="text" placeholder="Vetotapa" value={driveType} onChange={(event) => setDriveType(event.target.value)}/>
        <input type="text" placeholder="Moottori" value={engine} onChange={(event) => setEngine(event.target.value)}/>
        <input type="text" placeholder="Vaihteisto" value={gearbox} onChange={(event) => setGearbox(event.target.value)}/>

        <h3>Tekniset tiedot</h3>
        <input type="text" placeholder="Teho (KW / hp)" value={power} onChange={(event) => setPower(event.target.value)} />
        <input type="number" placeholder="Huippunopeus (km/h)" value={topSpeed} onChange={(event) => setTopSpeed(event.target.value)} />
        <input type="text" placeholder="Kulutus (l/100km)" value={fuelConsumption} onChange={(event) => setFuelConsumption(event.target.value)} />
        <input type="text" placeholder="Kiihtyvyys (0-100 km/h)" value={acceleration} onChange={(event) => setAcceleration(event.target.value)}/>

        <h3>Muuta</h3>
        <textarea placeholder="Lisätiedot" value={notes} onChange={(event) => setNotes(event.target.value)} />

        <button type="submit">Julkaise</button>
      </form>
    </div>
  )
}

export default AddCar
