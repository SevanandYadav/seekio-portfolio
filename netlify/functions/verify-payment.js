const crypto = require('crypto');
const Razorpay = require('razorpay');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      user_email,
      plan_details 
    } = JSON.parse(event.body);

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing payment verification data' })
      };
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RP_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Payment verification failed' 
        })
      };
    }

    // Initialize Razorpay to fetch payment details
    const razorpay = new Razorpay({
      key_id: process.env.RP_KEY_ID,
      key_secret: process.env.RP_KEY_SECRET
    });

    // Fetch payment details
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Generate invoice data
    const invoiceData = {
      invoice_id: `INV-${Date.now()}`,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      email: user_email,
      plan: plan_details,
      date: new Date().toISOString(),
      gst: {
        cgst: (payment.amount / 100) * 0.09, // 9% CGST
        sgst: (payment.amount / 100) * 0.09, // 9% SGST
        total_gst: (payment.amount / 100) * 0.18 // 18% total GST
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        verified: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        invoice: invoiceData,
        message: 'Payment verified successfully'
      })
    };

  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Payment verification failed',
        message: error.message 
      })
    };
  }
};