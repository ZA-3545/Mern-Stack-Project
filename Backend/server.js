const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });


dotenv.config();


const app = express();

console.log("Your URI is:", process.env.MONGO_URI);

const authRoutes = require('./routes.js');



app.use(cors());               
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Step to grow Database Connected"))
  .catch(err => console.log("DB Connection Error: ", err));


app.use('/api/users', authRoutes);




app.use(cors({
  origin: 'https://step-to-grow.netlify.app',
 methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-auth-token", "Authorization"],
  credentials: true
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => console.log(`Server running on port ${PORT}`));