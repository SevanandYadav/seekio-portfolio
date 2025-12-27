# Razorpay Integration Setup Guide

## Environment Variables Setup

### 1. Netlify Dashboard Setup
1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add the following variables:

```
RP_KEY_ID=rzp_test_xxxxxxxxxx (or rzp_live_xxxxxxxxxx for production)
RP_KEY_SECRET=your_secret_key_here
RP_WEBHOOK_SECRET=your_webhook_secret_here (optional, for webhook verification)
```

### 2. Local Development (.env)
Create a `.env` file in your project root:

```
RP_KEY_ID=rzp_test_xxxxxxxxxx
RP_KEY_SECRET=your_secret_key_here
RP_WEBHOOK_SECRET=your_webhook_secret_here
```

## File Structure
```
project/
├── netlify/
│   └── functions/
│       ├── package.json
│       ├── create-order.js
│       ├── verify-payment.js
│       └── razorpay-webhook.js
├── app/
│   └── components/
│       └── payment/
│           └── PaymentIntegration.tsx
└── .env (for local development)
```

## Testing Steps

### 1. Test Order Creation
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 999,
    "receipt": "test_receipt_123",
    "notes": {"plan": "Basic Plan"}
  }'
```

### 2. Test Payment Verification
Use Razorpay test credentials:
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **UPI ID:** success@razorpay
- **Netbanking:** Any bank (use "success" for successful payment)

### 3. Test Webhook
1. Set up webhook URL in Razorpay Dashboard:
   `https://your-site.netlify.app/.netlify/functions/razorpay-webhook`
2. Select events: `payment.captured`, `payment.failed`
3. Test with Razorpay webhook simulator

## Go-Live Checklist

### 1. Razorpay Account Setup
- [ ] Complete KYC verification
- [ ] Add bank account details
- [ ] Enable live mode
- [ ] Generate live API keys

### 2. Environment Variables
- [ ] Update `RP_KEY_ID` with live key (rzp_live_xxxxxxxxxx)
- [ ] Update `RP_KEY_SECRET` with live secret
- [ ] Set up webhook secret for production

### 3. Webhook Configuration
- [ ] Add production webhook URL in Razorpay Dashboard
- [ ] Enable required events: `payment.captured`, `payment.failed`
- [ ] Test webhook delivery

### 4. Security Checklist
- [ ] Never expose secret keys in frontend code
- [ ] Verify all payments on server-side
- [ ] Implement proper error handling
- [ ] Set up monitoring and logging
- [ ] Enable HTTPS (handled by Netlify)

### 5. GST Compliance
- [ ] Register for GST if applicable
- [ ] Configure GST rates in invoice generation
- [ ] Implement proper invoice numbering
- [ ] Store invoices for compliance

### 6. Testing in Production
- [ ] Test with small amount first
- [ ] Verify webhook delivery
- [ ] Check invoice generation
- [ ] Test refund process (if applicable)

## Integration Usage

### In your React component:
```tsx
import { PaymentIntegration } from '../components/payment/PaymentIntegration';

function PricingPage() {
  return (
    <div>
      <PaymentIntegration />
    </div>
  );
}
```

### API Endpoints:
- **Create Order:** `/.netlify/functions/create-order`
- **Verify Payment:** `/.netlify/functions/verify-payment`
- **Webhook:** `/.netlify/functions/razorpay-webhook`

## Error Handling
- All functions include proper error handling and CORS
- Payment verification uses HMAC SHA256 signature verification
- Webhook signature verification for security
- Comprehensive logging for debugging

## Support
- Razorpay Documentation: https://razorpay.com/docs/
- Test Credentials: https://razorpay.com/docs/payments/test-card-details/
- Webhook Testing: https://razorpay.com/docs/webhooks/test/