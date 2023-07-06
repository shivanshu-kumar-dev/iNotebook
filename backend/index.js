const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000



app.use(cors())

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})