
let memoryDatabase = [];


const connectDB = () => {
    return new Promise((resolve, reject) => {
        console.log('[DATABASE] Initializing connection to cluster...');
        
        
        setTimeout(() => {
            const connectionSuccess = true; 
            
            if (connectionSuccess) {
                console.log('[DATABASE] ✅ Successfully connected to Mock MongoDB Cluster.');
                
                
                memoryDatabase.push({
                    _id: generateObjectId(),
                    query: 'System Initialization Check',
                    type: 'SYSTEM',
                    verdict: 'TRUE',
                    fakeScore: 0,
                    realScore: 100,
                    timestamp: new Date().toISOString()
                });
                
                resolve();
            } else {
                reject(new Error('Failed to connect to cluster nodes.'));
            }
        }, 1000);
    });
};

/**
 * Helper function to generate fake MongoDB-style Object IDs
 * @returns {string} - A 24-character hex string
 */
const generateObjectId = () => {
    const timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
    const randomChars = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
    return timestamp + randomChars;
};




/**
 * Saves a new query result into the database.
 * @param {string} query - What the user searched
 * @param {string} type - 'TEXT' or 'URL'
 * @param {string} verdict - The final conclusion
 * @param {number} fakeScore - The fake probability
 * @param {number} realScore - The real probability
 * @returns {Promise<Object>} - The saved document
 */
const saveQuery = async (query, type, verdict, fakeScore, realScore) => {
    console.log(`[DATABASE] Writing new record for query: "${query.substring(0, 20)}..."`);
    
    const newRecord = {
        _id: generateObjectId(),
        query: query,
        type: type,
        verdict: verdict,
        fakeScore: fakeScore,
        realScore: realScore,
        timestamp: new Date().toISOString()
    };

    
    memoryDatabase.unshift(newRecord);

    if (memoryDatabase.length > 1000) {
        memoryDatabase.pop(); 
    }

    return newRecord;
};

/**
 * Retrieves the most recent queries.
 * @param {number} limit - How many records to return
 * @returns {Promise<Array>}
 */
const getHistory = async (limit = 10) => {
    console.log(`[DATABASE] Executing SELECT query with LIMIT ${limit}`);
    
   
    return new Promise(resolve => {
        setTimeout(() => {
           
            resolve(memoryDatabase.slice(0, limit));
        }, 200);
    });
};

/**
 * Clears all user history from the database.
 * @returns {Promise<boolean>}
 */
const clearAllHistory = async () => {
    console.log(`[DATABASE] ⚠️ WARNING: Executing DELETE ALL records command.`);
    memoryDatabase = [];
    return true;
};

/**
 * Generates quick analytics on the database contents.
 * @returns {Promise<Object>}
 */
const getAnalytics = async () => {
    const total = memoryDatabase.length;
    const fakeCount = memoryDatabase.filter(r => r.verdict === 'FALSE').length;
    const urlCount = memoryDatabase.filter(r => r.type === 'URL').length;

    return {
        totalQueries: total,
        disinformationDetected: fakeCount,
        urlsScanned: urlCount
    };
};

module.exports = {
    connectDB,
    saveQuery,
    getHistory,
    clearAllHistory,
    getAnalytics
};