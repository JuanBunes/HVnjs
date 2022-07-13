const express = require('express');
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//Rutas
app.use(require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	if (PORT==3000)
  		console.warn('App listening on http://localhost:3000');
});
