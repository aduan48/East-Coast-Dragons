const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allows your React app to talk to it
};

/**
 * Fetches the correct json file for the age group
 * @param event 
 * @returns 
 */
exports.handler = async (event) => {
    try {
        const group = event.queryStringParameters.group;
        let data;

        if (group === "U18") {
            data = require('./scheduleU18.json');
        } else if (group === "U16") {
            data = require('./scheduleU16.json');
        } else {
            data = require('./scheduleU14.json');
        }

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