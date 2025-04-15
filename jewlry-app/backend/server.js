require('dotenv').config();
const express = require('express');
const {exec} = require('child_process');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'uploads')));
const inputPath = path.join(__dirname, 'public', 'earrings2.png');
const outputPath = path.join(__dirname, 'public','earrings_nobg.png');

//remove background using rembg
exec(`rembg i "${inputPath}" "${outputPath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing rembg: ${error.message}`);
        return;
    }
    else{
        console.log('background removed successfully!');
    }
});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "earrings" folder
app.use(express.static(path.join(__dirname)));

// Default route to serve index2.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
