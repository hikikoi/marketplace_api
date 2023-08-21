const express = require("express");
const config = require("./config/config");

const ErrorHandlerMiddleware = require("./middleware/errorHandler.middleware");
const NotFoundException = require("./errors/notFound.exception");
const router = require("./routes");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.use('/*', (req, res, next) => {
  next(new NotFoundException(`${req.baseUrl} not found`));
});

app.use(ErrorHandlerMiddleware);

const PORT = config.app.port;
app.listen(PORT, () => {
  console.log("Running on port: ", PORT);
});
