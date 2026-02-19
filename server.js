const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("Hello Triphon Journey is still fresh don't wait create your opportunities!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
