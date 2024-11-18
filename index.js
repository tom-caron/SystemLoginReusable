const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par IP
    message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Middleware
app.use(bodyParser.json());
app.use(cors());

const connectDB = require('./database/config');
connectDB();


// Routes
app.get('/', (req, res) => {
    res.send('Système de login réutilisable prêt à démarrer 🚀');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
