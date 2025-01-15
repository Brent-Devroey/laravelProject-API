const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes')
const newsRoutes = require('./routes/newsRoutes')
const bodyParser = require('body-parser')
const db = require("./db");
const path = require('path');



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/news', newsRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});