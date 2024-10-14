const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Apply for a job
router.post('/apply', async (req, res) => {
    const { jobId, username, userEmail } = req.body;
    const user = new User({ jobId, username, userEmail });
    try {
        await user.save();
        res.status(201).json({ message: 'Application successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all jobs applied by a user
router.get('/:userEmail/applications', async (req, res) => {
    try {
        const applications = await User.find({ userEmail: req.params.userEmail });
        if (applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user.' });
        }
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/jobs', async (req, res) => {
    try {
        const response = await axios.get('http://jobs-microservice-url/api/jobs'); // Replace with the actual URL of your jobs microservice
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
    }
});


module.exports = router;
