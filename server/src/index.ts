import compression from 'compression'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { initFileKeyPair } from '~/utils/file'
import usersRoute from '~/routes/users.routes'
import cors from 'cors'

config()
const app = express()
app.use(express.json())

const port = 4000

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init privateKey vs publicKey
initFileKeyPair()
// config cors
app.use(cors())

// init routes
app.use('/v1/api/users', usersRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
