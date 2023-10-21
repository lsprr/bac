const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config()

const app = express();
const PORT = 3001;
const SECRET = process.env.JWT_SECRET;
const TOKEN = process.env.BEARER_TOKEN;

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.post('/generate_token', (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            error: 'Login and password are required'
        });
    }

    const token = jwt.sign({ login, password }, SECRET);
    res.json({ token });
});

app.get('/tracking_parcel', async (req, res) => {
    const { tracking_number } = req.query;

    if (!tracking_number) {
        return res.status(400).json({
            error: 'Tracking number is required'
        });
    }

    try {
        const response = await axios.get(`https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${tracking_number}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to retrieve parcel info';
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
