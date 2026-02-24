//1. Dependencies
const express = require('express');
const cors = require('cors');
//2. App
const app = express();

// 3. Middleware   Enable CORS for all routes
app.use(cors());
app.use(express.json()); // for post
app.use(express.static('public')); //Express can also serve static files 

// 4.states
const users = []; // in-memory storage

//5.utilities
const fakeHash = (password) => "hashed_" + password;

   ////Routes
// Example route
app.get('/secret', (req, res) => {
    const username = req.query.user; // ?user=triphon
    if (username === 'triphon') {
        res.send('Triphon, your brain is working at metacognition level! 🚀');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// POST route (write / send structured data)
app.post('/signup',(req,res) => {
    const{username,email,password} = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: 'Missing or empty fields!' });
    }

    // Check for duplicate email
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: `Email Already registered!`});
    }

    // Create user objects
    const user = {
        id: users.length + 1,            //inreamental ID
        username,
        email,
        passwordHash: fakeHash(password), //hash demo
        createdAt: new Date().toISOString()  // time stamp
    }

    // Store in memory
    users.push(user);

    // Simulation only (no persistence yet)
    res.status(201).json({
        message: `User ${username} registered successfully`,
        data: { id: user.id,username: user.username,email: user.email }

    });
});

// GET user by ID (read specific resource)
    app.get('/users/:id',(rep,res) =>{
        const id = Number(rep.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({message: 'Invaid user ID format'})
        }

        const user = users.find(u => u.id === id);
        
        if (!user) {
            return res.status(404).json({message: 'user not found'})
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    });

///// error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});
 
//// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT,() =>{
    console.log(`server listening on http://localhost:${PORT}`);
});