import express from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from '../src/routes/userRoutes'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';


connectDB();

const port = process.env.PORT || 5000

const app = express();

app.use(cors({
    credentials:true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const server = http.createServer(app);

app.use('/api/users', userRoutes)


app.get('/', (req,res) => res.send('Server is ready!'));


app.use(notFound)
app.use(errorHandler)

server.listen(port, ()=>{
    console.log(`Server runnig on http://localhost:${port}`)
})