const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allows your React app to talk to it
};

/**
 * fetches the data for the tournament line ups
 * @param event 
 * @returns 
 */
exports.handler = async (event) => {
    try {
        let data = require('./tournament.json');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to load schedule file" }),
        };
    }
};