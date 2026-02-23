const express = require('express');
const cors = require('cors'); // import cors
const app = express();

// Enable CORS for all routes
app.use(cors());

console.log(app)

app.listen(8000,() =>{
    console.log('server listening on port 8000')
})

app.get ('/secret',(req,res) =>{
    const username = req.query.user; // ?triphon
    if(username === 'triphon'){
        res.send('Triphon, you did it and your brain is working at metacognition level and finding patterns.! wow')
    }else {
        res.status(401).send('unauthorized');
    }
});

