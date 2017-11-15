const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')


app.use(express.static(path.join(__dirname, '/src/public')))

// set 'html' as the engine, using ejs's renderFile function

app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/src/views')
app.set('view engine', 'html');

app.get('/', (request, response) => {
  response.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
