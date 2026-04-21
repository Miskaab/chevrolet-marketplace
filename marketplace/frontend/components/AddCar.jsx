import { useState } from 'react'
import axios from 'axios'

function AddCar() {
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
  const [power, setPower] = useState('')
  const [topSpeed, setTopSpeed] = useState('')
  const [fuelConsumption, setFuelConsumption] = useState('')
  const [acceleration, setAcceleration] = useState('')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const basicData = {
        model,
        price: parseInt(price),
        image_url: imageUrl,
        year_model: parseInt(yearModel),
        mileage: parseInt(mileage),
        engine,
        gearbox,
        registration_number: regNumber,
        color,
        drive_type: driveType
      }

      const basicResponse = await axios.post('http://localhost:3001/api/basics', basicData)
      const newCarId = basicResponse.data.BasicID

      const specData = {
        BasicID: newCarId,
        power,
        top_speed: parseInt(topSpeed),
        acceleration,
        fuel_consumption: fuelConsumption,
        weight
      }

      await axios.post('http://localhost:3001/api/specifications', specData)

      await axios.post('http://localhost:3001/api/features', {
        notes,
        BasicID: newCarId
      })

      alert('Julkaisu onnistui')

      setModel('')
      setPrice('')
      setYearModel('')
      setMileage('')
      setImageUrl('')
      setRegNumber('')
      setColor('')
      setDriveType('')
      setEngine('')
      setGearbox('')
      setPower('')
      setTopSpeed('')
      setFuelConsumption('')
      setAcceleration('')
      setWeight('')
      setNotes('')
    } catch (error) {
      console.error('Virhe auton lisäyksessä:', error)
      alert('Julkaisu epäonnistui')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Perustiedot</h3>

        <input
          type="text"
          placeholder="Malli"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />

        <input
          type="number"
          placeholder="Hinta"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <input
          type="number"
          placeholder="Vuosimalli"
          value={yearModel}
          onChange={(event) => setYearModel(event.target.value)}
        />

        <input
          type="number"
          placeholder="Kilometrit"
          value={mileage}
          onChange={(event) => setMileage(event.target.value)}
        />

        <input
          type="text"
          placeholder="Kuvan URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />

        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Esikatselu" />
          </div>
        )}

        <input
          type="text"
          placeholder="Rekisterinumero"
          value={regNumber}
          onChange={(event) => setRegNumber(event.target.value)}
        />

        <input
          type="text"
          placeholder="Väri"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />

        <input
          type="text"
          placeholder="Vetotapa"
          value={driveType}
          onChange={(event) => setDriveType(event.target.value)}
        />

        <input
          type="text"
          placeholder="Moottori"
          value={engine}
          onChange={(event) => setEngine(event.target.value)}
        />

        <input
          type="text"
          placeholder="Vaihteisto"
          value={gearbox}
          onChange={(event) => setGearbox(event.target.value)}
        />

        <h3>Tekniset tiedot</h3>

        <input
          type="text"
          placeholder="Teho"
          value={power}
          onChange={(event) => setPower(event.target.value)}
        />

        <input
          type="number"
          placeholder="Huippunopeus"
          value={topSpeed}
          onChange={(event) => setTopSpeed(event.target.value)}
        />

        <input
          type="text"
          placeholder="Kulutus"
          value={fuelConsumption}
          onChange={(event) => setFuelConsumption(event.target.value)}
        />

        <input
          type="text"
          placeholder="Kiihtyvyys"
          value={acceleration}
          onChange={(event) => setAcceleration(event.target.value)}
        />

        <input
          type="text"
          placeholder="Paino"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />

        <h3>Muuta</h3>

        <textarea
          placeholder="Lisätiedot"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />

        <button type="submit">Julkaise</button>
      </form>
    </div>
  )
}

export default AddCar