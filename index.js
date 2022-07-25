const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database/index');
const userRouter = require('./routes/users');
const noteRouter = require('./routes/note');


const app = express()

app.use(express.json())
app.use(cors())        

app.use(setReqContext);
app.use(logger);

app.use(userRouter);
app.use(noteRouter);

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);
    next();
}

function setReqContext(req, res, next) {
    req.context = {
        // user will be present for authenticated routes
    }
    next();
}

connectDatabase().then(() => {
    app.listen(3001, () => {
        console.log("Server running at http://localhost:3001")
    })
})
