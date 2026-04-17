const express = require('express')
const cors = require('cors')
const app = express()
const { supabase } = require('./database.js');
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cors())


app.get('/api/basics', async (request, response) => {
  const { data, error } = await supabase
    .from('Basics')
    .select(`
      *,
      Specifications (*),
      Features (*)
    `)

  if (error) {
    console.error('Error fetching basics', error)
    return response.status(500).json({ error: 'Database error' })
  }

  response.json(data)
})



app.post('/api/basics/', async (request, response) => {
  const { registration_number, engine, gearbox, mileage, year_model, drive_type, color, model, price, image_url } = request.body;

  const { data, error } = await supabase
    .from('Basics')
    .insert([{ registration_number: registration_number, engine: engine, gearbox: gearbox, mileage: mileage, year_model: year_model, drive_type: drive_type, color: color, model: model, price: price, image_url: image_url }])
    .select()
    .single();

  if (error) {
    console.error('Error creating basics:', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.status(201).json(data);
});

app.post('/api/specifications/', async (request, response) => {
  const { BasicID, power, acceleration, top_speed, fuel_consumption, weight } = request.body;

  const { data, error } = await supabase
    .from('Specifications')
    .insert([{ BasicID: BasicID, power: power, acceleration: acceleration, top_speed: top_speed, fuel_consumption: fuel_consumption, weight: weight }])
    .select()
    .single();

  if (error) {
    console.error('Error creating specifications:', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.status(201).json(data);
});

app.post('/api/features/', async (request, response) => {
  const { notes, BasicID } = request.body;

  const { data, error } = await supabase
    .from('Features')
    .insert([{ notes: notes, BasicID: BasicID }])
    .select()
    .single();

  if (error) {
    console.error('Error creating features:', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.status(201).json(data);
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  const { data: existingUser, error: existingError } = await supabase
    .from('Users')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (existingError) {
    return res.status(500).json({ error: existingError.message })
  }

  if (existingUser) {
    return res.status(400).json({ error: 'Käyttäjänimi on jo käytössä' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('Users')
    .insert([{ username: username, password: hashedPassword }])
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ message: 'Käyttäjä luotu', user: data })
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  const { data: user, error } = await supabase
    .from('Users')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !user) {
    return res.status(401).json({ error: 'Väärä käyttäjänimi' })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return res.status(401).json({ error: 'Väärä salasana' })
  }

  const token = jwt.sign(
    { userId: user.UserID, username: user.username, isAdmin: user.is_admin  },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  )

  res.json({
    message: 'OK',
    token,
    user: {
      id: user.UserID,
      username: user.username,
      isAdmin: user.is_admin
    }
  })
})

app.put('/api/basics/:id', async (req, res) => {
  const { id } = req.params
  const { model, price, mileage, year_model, color, engine, gearbox, drive_type, image_url } = req.body

  const { data, error } = await supabase
    .from('Basics')
    .update({ model, price, mileage, year_model, color, engine, gearbox, drive_type, image_url })
    .eq('BasicID', id)
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

app.delete('/api/basics/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('Basics')
    .delete()
    .eq('BasicID', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ message: 'Auto poistettu' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})