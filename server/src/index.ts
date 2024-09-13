import compression from 'compression'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

config()
const app = express()

const port = 4000 || process.env.PORT

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db

// init routes

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'succes'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
