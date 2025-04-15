require('dotenv').config();
const express = require('express');
const {exec} = require('child_process');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const earringsRoutes = require('./routes/earringsRoutes');  

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = 'mongodb+srv://brinda1104:hi731yx@jewlry-try-on.6ofclhq.mongodb.net/';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// //background removal using rembg
// const inputPath = path.join(__dirname, 'public', 'earrings2.png');
// const outputPath = path.join(__dirname, 'public','earrings_nobg.png');

// exec(`rembg i "${inputPath}" "${outputPath}"`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing rembg: ${error.message}`);
//         return;
//     }
//     else{
//         console.log('background removed successfully!');
//     }
// });

//using earring routes
app.use(earringsRoutes);

// Default route to serve index2.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend', 'index2.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
