import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/api/register', {
        username,
        password
      })

      alert('Käyttäjä luotu!')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.error || 'Virhe rekisteröitymisessä')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Rekisteröidy</h2>

        <input
          type="text"
          placeholder="Käyttäjänimi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Luo käyttäjä</button>

        <p>
          Onko jo käyttäjä? <Link to="/login">Kirjaudu</Link>
        </p>
      </form>
    </div>
  )
}

export default Register