require('module-alias/register');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const logger = require('./config/logger');
const initDBConnection = require('./config/dbConfig');
const authRoutes = require('./routes/auth/authRoutes');
const feedbackRoutes = require('./routes/feedback/feedbackRoutes');
const socketController = require('@controllers/socket/socketController');

dotenv.config();


const port = process.env.PORT || 4000;
const corsOptions = {
    origin: "*"
};

initDBConnection();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
socketController.initSocket(io);





app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);


app.get('/', (req, res) => {
    res.send('Testing server');
});

httpServer.listen(port, () => {
    logger.info(`Server listening at port number: ${port}`);
});
