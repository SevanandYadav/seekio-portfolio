import { useState } from 'react';

const PLANS = {
  basic: { name: 'Basic Plan', price: 999, features: ['Feature 1', 'Feature 2'] },
  premium: { name: 'Premium Plan', price: 1999, features: ['All Basic', 'Feature 3', 'Feature 4'] },
  enterprise: { name: 'Enterprise Plan', price: 4999, features: ['All Premium', 'Feature 5', 'Priority Support'] }
};

export function PaymentIntegration() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (amount, planDetails) => {
    try {
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: `receipt_${Date.now()}`,
          notes: {
            plan: planDetails.name,
            user_email: 'user@example.com' // Get from user context
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData, planDetails) => {
    try {
      const response = await fetch('/.netlify/functions/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentData,
          user_email: 'user@example.com', // Get from user context
          plan_details: planDetails
        })
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      const planDetails = PLANS[selectedPlan];
      
      // Create order
      const orderData = await createOrder(planDetails.price, planDetails);

      // Configure Razorpay options
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Seekio Academic Management',
        description: `Payment for ${planDetails.name}`,
        order_id: orderData.order_id,
        handler: async (response) => {
          try {
            // Verify payment
            const verification = await verifyPayment(response, planDetails);
            
            if (verification.success) {
              setPaymentStatus({
                type: 'success',
                message: 'Payment successful!',
                invoice: verification.invoice
              });
              
              // Redirect to dashboard or success page
              setTimeout(() => {
                window.location.href = '/dashboard';
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            setPaymentStatus({
              type: 'error',
              message: 'Payment verification failed. Please contact support.'
            });
          }
        },
        prefill: {
          name: 'User Name', // Get from user context
          email: 'user@example.com', // Get from user context
          contact: '9999999999' // Get from user context
        },
        notes: {
          plan: planDetails.name
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus({
              type: 'info',
              message: 'Payment cancelled by user'
            });
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({
        type: 'error',
        message: error.message || 'Payment failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
      
      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(PLANS).map(([key, plan]) => (
          <div
            key={key}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan(key)}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">₹{plan.price}</p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Button */}
      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Processing...' : `Pay ₹${PLANS[selectedPlan].price}`}
        </button>
      </div>

      {/* Payment Status */}
      {paymentStatus && (
        <div className={`mt-6 p-4 rounded-lg ${
          paymentStatus.type === 'success' ? 'bg-green-100 text-green-800' :
          paymentStatus.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          <p className="font-medium">{paymentStatus.message}</p>
          {paymentStatus.invoice && (
            <div className="mt-2 text-sm">
              <p>Invoice ID: {paymentStatus.invoice.invoice_id}</p>
              <p>Payment ID: {paymentStatus.invoice.payment_id}</p>
            </div>
          )}
        </div>
      )}

      {/* Test Credentials Info */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Test Credentials</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p><strong>Card:</strong> 4111 1111 1111 1111</p>
          <p><strong>Expiry:</strong> Any future date</p>
          <p><strong>CVV:</strong> Any 3 digits</p>
          <p><strong>UPI:</strong> success@razorpay</p>
          <p><strong>Netbanking:</strong> Any bank (use success for success)</p>
        </div>
      </div>
    </div>
  );
}