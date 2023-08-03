import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
var port = process.env.PORT || 5000;
var app = express();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
var server = http.createServer(app);
app.get('/', function (req, res) { return res.send('Server is ready!'); });
server.listen(port, function () {
    console.log("Server runnig on http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map