import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import schoolRoutes from './routes/school.route.js'
import { errorResponse } from './utils/error.js'
import db_pool from "./database/connect.js";

config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(schoolRoutes)
app.use(errorResponse)

// ----------------Close the mySQL connection pool on server shutdown------------------
process.on('SIGINT', () => {
  db_pool.end((err) => {
      if (err) {
          console.error('Error closing the connection pool:', err.message);
      }
      console.log('Connection pool closed.');
      process.exit();
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
