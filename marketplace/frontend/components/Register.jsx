import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:3001/api/register', {
                username,
                password
            })

            alert('Käyttäjä luotu!')
            window.location.href = '/login'

        } catch (err) {
            console.log(err.response?.data)
            alert(err.response?.data?.error || 'Virhe')
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Rekisteröidy</h2>

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

            <button type="submit">Luo käyttäjä</button>
        </form>
    )
}

export default Register