import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      })

      localStorage.setItem('token', res.data.token)

      const userData = {
        id: res.data.user.id,
        username: res.data.user.username,
        isAdmin: res.data.user.is_admin
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (err) {
      alert(err.response?.data?.error || 'Virhe kirjautumisessa')
    }
  }


  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Kirjaudu</h2>

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

        <button type="submit">Kirjaudu</button>

        <p>
          Ei vielä käyttäjää? <Link to="/register">Rekisteröidy</Link>
        </p>
      </form>
    </div>
  )
}

export default Login