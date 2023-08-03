import express from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config'

const port = process.env.PORT || 5000

const app = express();

app.use(cors({
    credentials:true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app);

app.get('/', (req,res) => res.send('Server is ready!'));

server.listen(port, ()=>{
    console.log(`Server runnig on http://localhost:${port}`)
})