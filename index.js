const connectDB = require('./db')
var cors = require('cors')
connectDB()
const express = require('express')
const app = express()
// const port = 5000

app.use(cors({
    origin: '*'
  }));
app.use(express.json()) // Helps use req variables in app.get
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))


app.get('/', (req, res) => {
    console.log(req.body)
    res.send('CloudBook API!')
})

// app.listen(0, () => {
//     console.log(`Example app listening at  http://localhost:`,app.address().port)
// })


const server = app.listen(0, () => console.log(`Server started on port :`,server.address().port));
// Export the Express API
module.exports = app