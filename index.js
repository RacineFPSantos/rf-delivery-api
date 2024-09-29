const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error: '. err));

//Routes
app.get('/', (req, res) => {
  res.send('Restaurante API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})