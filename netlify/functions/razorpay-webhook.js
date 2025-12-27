const crypto = require('crypto');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const webhookSignature = event.headers['x-razorpay-signature'];
    const webhookBody = event.body;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RP_WEBHOOK_SECRET || process.env.RP_KEY_SECRET)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      console.error('Webhook signature verification failed');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' })
      };
    }

    const payload = JSON.parse(webhookBody);
    const { event: eventType, payload: eventPayload } = payload;

    console.log('Webhook received:', eventType, eventPayload.payment?.entity?.id);

    switch (eventType) {
      case 'payment.captured':
        await handlePaymentCaptured(eventPayload.payment.entity);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(eventPayload.payment.entity);
        break;
      
      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' })
    };
  }
};

async function handlePaymentCaptured(payment) {
  console.log('Payment captured:', {
    id: payment.id,
    amount: payment.amount / 100,
    email: payment.email,
    status: payment.status
  });
  
  // TODO: Update user subscription status
  // TODO: Send confirmation email
  // TODO: Generate invoice
}

async function handlePaymentFailed(payment) {
  console.log('Payment failed:', {
    id: payment.id,
    amount: payment.amount / 100,
    email: payment.email,
    error_code: payment.error_code,
    error_description: payment.error_description
  });
  
  // TODO: Send failure notification
  // TODO: Log for retry attempts
}