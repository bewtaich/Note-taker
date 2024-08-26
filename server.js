
const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public' ,'notes.html'))
  });

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
});
  
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});