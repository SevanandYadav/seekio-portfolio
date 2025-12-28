exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { username, email, password, role } = JSON.parse(event.body);
    
    console.log('Calling API:', process.env.REGISTER_API_URL);
    console.log('Payload:', { username, email, role }); // Don't log password
    
    const response = await fetch(process.env.REGISTER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });

    console.log('API Response status:', response.status);
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Registration failed', details: error.message })
    };
  }
};