import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      })

      localStorage.setItem('user', JSON.stringify(res.data.user))

      alert('Kirjautuminen onnistui!')
      window.location.href = '/'

    } catch {
      alert('Väärät tiedot')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Kirjaudu</h2>

      <input
        type="text"
        placeholder="Käyttäjänimi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Kirjaudu</button>
    </form>
  )
}

export default Login