const express = require('express')
const cors = require('cors')
const app = express()
const { supabase } = require('./database.js');
require('dotenv').config();


app.use(express.json())
app.use(cors())

app.get('/api/basic/', async (request, response) => {
  const { data, error } = await supabase.from('Basics').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return response.status(500).json({ error: 'Database error' });
  }

  response.json(data);
});




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})