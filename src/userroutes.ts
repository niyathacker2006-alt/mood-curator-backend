import jwt from 'jsonwebtoken';
import express from 'express';
import User from './user'; 
const router = express.Router();
// Your secret key (In real life, put this in a .env file!)
const JWT_SECRET = "my_super_secret_key_123"; 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user in MongoDB
    const user = await User.findOne({ email });
    
    // (Assuming you check the password here and it matches...)

    if (user) {
        // 2. Create the REAL token! We pack the user's MongoDB ID inside it.
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

        // 3. Send it back to the frontend
        res.status(200).json({ 
            message: "Login successful", 
            token: token,
            user: { email: user.email }
        });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});