const app = require("express")();

require('dotenv').config();
require("./config")(app);

const server = app.listen(process.env.PORT, () => console.log(`Server has been started on ${process.env.PORT} port`));

require("./socketChat")(server);