import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      })

      alert('Kirjautuminen onnistui!')
      console.log(response.data)

    } catch (error) {
      alert('Virhe kirjautumisessa')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Kirjaudu</h2>

      <input
        type="text"
        placeholder="Käyttäjänimi"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Kirjaudu</button>
    </form>
  )
}

export default Login