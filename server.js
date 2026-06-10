

const express = require('express');
const cors = require('cors');
const factCheckService = require('./fast_check_service');
const db = require('./SIM_DB');


const app = express();


app.use(cors({
    origin: '*', // In production, replace '*' with your actual frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


const requestLogs = {};
app.use((req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    if (!requestLogs[ip]) {
        requestLogs[ip] = [];
    }
    
    requestLogs[ip] = requestLogs[ip].filter(timestamp => now - timestamp < 60000);
    if (requestLogs[ip].length > 50) {
        console.warn(`[SECURITY] Rate limit exceeded for IP: ${ip}`);
        return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }
    requestLogs[ip].push(now);
    
    
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});



/**
 * @route   GET /api/health
 * @desc    Check if the server is running correctly
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ONLINE',
        uptime: process.uptime(),
        message: 'Truth Check API is active and ready.',
        timestamp: new Date()
    });
});

/**
 * @route   POST /api/analyze/text
 * @desc    Analyze a text claim for authenticity
 */
app.post('/api/analyze/text', async (req, res) => {
    try {
        const { claim } = req.body;

        if (!claim || claim.trim() === '') {
            return res.status(400).json({ error: 'Missing claim text in request body.' });
        }

        console.log(`[ANALYSIS] Starting text verification for: "${claim.substring(0, 30)}..."`);
        
        // Pass the claim to our service file for processing
        const result = await factCheckService.analyzeTextClaim(claim);

        // Save the result to our simulated database
        await db.saveQuery(claim, 'TEXT', result.verdict, result.fakeScore, result.realScore);

        // Return the final data to the frontend
        res.status(200).json(result);

    } catch (error) {
        console.error('[ERROR] Failed to analyze text:', error);
        res.status(500).json({ error: 'Internal server error during text analysis.' });
    }
});

/**
 * @route   POST /api/analyze/url
 * @desc    Analyze a URL for domain trust and tracking scripts
 */
app.post('/api/analyze/url', async (req, res) => {
    try {
        const { targetUrl } = req.body;

        if (!targetUrl) {
            return res.status(400).json({ error: 'Missing target URL in request body.' });
        }

        console.log(`[ANALYSIS] Starting domain scan for: ${targetUrl}`);

        const result = await factCheckService.analyzeUrl(targetUrl);
        
        await db.saveQuery(targetUrl, 'URL', result.verdict, result.fakeScore, result.realScore);

        res.status(200).json(result);

    } catch (error) {
        console.error('[ERROR] Failed to analyze URL:', error);
        res.status(500).json({ error: 'Internal server error during URL analysis.' });
    }
});

/**
 * @route   GET /api/history
 * @desc    Fetch the last 10 queries from the database
 */
app.get('/api/history', async (req, res) => {
    try {
        console.log(`[DATABASE] Fetching activity log...`);
        const history = await db.getHistory(10);
        res.status(200).json({ data: history });
    } catch (error) {
        console.error('[ERROR] Failed to fetch history:', error);
        res.status(500).json({ error: 'Database connection failed.' });
    }
});



app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found. Please check the URL.' });
});


const PORT = process.env.PORT || 3000;

db.connectDB().then(() => {
    app.listen(PORT, () => {
       
        console.log(`TRUTH CHECK SERVER SECURELY RUNNING`);
        console.log(`Listening on Port: ${PORT}`);
        
    });
}).catch(err => {
    console.error('CRITICAL STARTUP FAILURE:', err);
    process.exit(1);
});