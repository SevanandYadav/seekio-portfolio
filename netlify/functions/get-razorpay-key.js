exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get Razorpay key from environment variable
    const razorpayKey = process.env.RP_KEY_ID;
    
    if (!razorpayKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Razorpay key not configured' 
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        key: razorpayKey 
      })
    };

  } catch (error) {
    console.error('Error getting Razorpay key:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get payment configuration' 
      })
    };
  }
};