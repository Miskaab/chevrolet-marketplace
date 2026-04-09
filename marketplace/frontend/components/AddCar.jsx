import { useState } from 'react'
import axios from 'axios'

function AddCar() {
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios.post('', {
      model: model,
      price: price,
      image_url: imageUrl
    })
    .then(response => {
      alert("Auto lisätty myyntiin!")
    })
  }

  return (
    <div>
      <h2>Lisää auto myyntiin</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Auton malli" 
          value={model} 
          onChange={(event) => setModel(event.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Hinta (€)" 
          value={price} 
          onChange={(event) => setPrice(event.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Kuvan URL" 
          value={imageUrl} 
          onChange={(event) => setImageUrl(event.target.value)} 
        />
        <button type="submit">Julkaise ilmoitus</button>
      </form>
    </div>
  )
}

export default AddCar
