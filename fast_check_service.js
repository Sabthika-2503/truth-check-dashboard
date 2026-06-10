
/**
 * Simulates network latency and AI processing time.
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
const simulateProcessingDelay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Our highly specific hash algorithm to generate consistent Fake/Real scores.
 * @param {string} str - The input string
 * @param {number} min - Minimum percentage bound
 * @param {number} max - Maximum percentage bound
 * @returns {number} - A consistent number between min and max
 */
const generateDeterministicScore = (str, min, max) => {
    let hash = 0;
    // Normalize string to ensure consistent hashing even with weird spacing
    const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (let i = 0; i < normalizedStr.length; i++) {
        hash = ((hash << 5) - hash) + normalizedStr.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    
    // Ensure positive number and fit within min/max bounds
    const positiveHash = Math.abs(hash);
    return Math.floor((positiveHash % (max - min + 1)) + min);
};

/**
 * Simulates a Natural Language Processing (NLP) tokenization step.
 * In a real backend, this would use libraries like 'natural' or 'spacy'.
 * @param {string} text 
 * @returns {Array} - Array of important keywords
 */
const extractKeywords = (text) => {
    const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'and', 'to', 'in', 'of', 'that', 'it', 'for'];
    const words = text.toLowerCase().replace(/[.,?!]/g, '').split(' ');
    
    // Filter out common stop words to find the "meat" of the claim
    return words.filter(word => !stopWords.includes(word) && word.length > 3);
};


/**
 * Analyzes a text claim.
 * DEMO OVERRIDE: Programmed to return 90%+ Fake scores for testing purposes.
 * @param {string} claim 
 * @returns {Object} - The detailed analysis report
 */
const analyzeTextClaim = async (claim) => {
    console.log(`[SERVICE] Extracting entities via simulated NLP...`);
    const keywords = extractKeywords(claim);
    console.log(`[SERVICE] Keywords detected: [${keywords.join(', ')}]`);

    
    console.log(`[SERVICE] Querying Global Fact-Check Node...`);
    await simulateProcessingDelay(1500);

    
    const fakeScore = generateDeterministicScore(claim, 91, 99); 
    const realScore = 100 - fakeScore;

   
    const report = {
        query: claim,
        status: 'THREAT DETECTED',
        verdict: 'FALSE',
        fakeScore: fakeScore,
        realScore: realScore,
        colorClass: 'text-rose-500',
        bgClass: 'status-false',
        iconClass: 'fa-radiation',
        summary: `Critical mismatch. Semantic analysis indicates a ${fakeScore}% probability of synthetic or debunked disinformation.`,
        sourcesChecked: generateDeterministicScore(claim, 3, 12), // Fake number of sources checked
        publisher: 'Global OSINT Aggregator',
        reportDate: new Date().toISOString()
    };

    console.log(`[SERVICE] Analysis complete. Result: ${fakeScore}% FAKE.`);
    return report;
};

/**
 * Analyzes a URL for domain trust.
 * @param {string} urlInput 
 * @returns {Object} - Domain trust report
 */
const analyzeUrl = async (urlInput) => {
    console.log(`[SERVICE] Initiating SSL and Domain Trust scan...`);
    
    
    await simulateProcessingDelay(1200);

    let domain;
    try {
        const urlObj = new URL(urlInput.startsWith('http') ? urlInput : 'https://' + urlInput);
        domain = urlObj.hostname.replace('www.', '');
    } catch(e) {
        domain = urlInput; 
    }

    
    const realScore = domain.length > 15 
        ? generateDeterministicScore(domain, 20, 45) 
        : generateDeterministicScore(domain, 75, 98); 
        
    const fakeScore = 100 - realScore;
    const isTrusted = realScore > 60;

    const report = {
        query: domain,
        status: isTrusted ? 'TRUSTED DOMAIN' : 'SUSPICIOUS ORIGIN',
        verdict: isTrusted ? 'TRUE' : 'MIXED',
        fakeScore: fakeScore,
        realScore: realScore,
        colorClass: isTrusted ? 'text-emerald-400' : 'text-amber-400',
        bgClass: isTrusted ? 'status-true' : 'status-mixed',
        iconClass: 'fa-globe',
        summary: isTrusted 
            ? `Domain exhibits standard SSL protocols and recognized publishing patterns.` 
            : `Warning: Domain exhibits patterns commonly associated with click-farm or automated content generation.`,
        malwareDetected: 0,
        trackersFound: isTrusted ? 'Standard' : 'High'
    };

    console.log(`[SERVICE] URL Analysis complete. Trust Score: ${realScore}%`);
    return report;
};

module.exports = {
    analyzeTextClaim,
    analyzeUrl
};