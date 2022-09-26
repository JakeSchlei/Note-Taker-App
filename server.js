// require express
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));



app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});









app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});