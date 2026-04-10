const express = require('express')
const cors = require('cors')
const app = express()
const { supabase } = require('./database.js');
require('dotenv').config();


app.use(express.json())
app.use(cors())

app.get('/api/basics/', async (request, response) => {
  const { data, error } = await supabase.from('Basics').select('*');

  if (error) {
    console.error('Error fetching basics', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.json(data);
});


app.post('/api/basics/', async (request, response) => {
  const { registration_number, engine, gearbox, mileage, year_model, drive_type, color, model, price, image_url } = request.body;

  const { data, error } = await supabase
    .from('Basics')
    .insert([{ registration_number: registration_number, engine: engine, gearbox: gearbox, mileage: mileage, year_model: year_model, drive_type: drive_type, color:color, model: model, price: price, image_url: image_url }])
    .select()
    .single();

  if (error) {
    console.error('Error creating basics:', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.status(201).json(data);
});

app.post('/api/specifications/', async (request, response) => {
  const { BasicID, power, acceleration, top_speed, fuel_consumptions } = request.body;

  const { data, error } = await supabase
    .from('Specifications')
    .insert([{ BasicID: BasicID, power: power, acceleration: acceleration, top_speed: top_speed, fuel_consumptions: fuel_consumptions }])
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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})