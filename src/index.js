const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const keys = require("./config/keys");

const phoneNumberV1Routes = require("./routes/v1/phone-numbers");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({origin: '*'}));
app.use(morgan('dev'));


app.use('/api/v1/admin/phone-numbers', phoneNumberV1Routes);

const server = app.listen(keys.port, () => {
    console.log(`Connected to Server in ${keys.nodeENV} mode on port ${keys.port}`);
});

server.on('SIGTERM', () => {
    server.close((err) => {
        console.log(`Error: ${err}`);
    });
});