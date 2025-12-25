const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, company, service, message, isOTP, otpCode } = JSON.parse(event.body);

    // Fetch contact config
    const contactResponse = await fetch('https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/content/contact.json');
    const contactData = await contactResponse.json();
    const emailMethod = contactData.contactMethods.find(method => method.icon === 'Mail');

    let emailConfig;
    
    if (isOTP) {
      // For OTP emails, send directly to user
      emailConfig = {
        from: emailMethod?.fromEmail || 'noreply@seekio.in',
        to: email, // Send to user's email
        subject: 'Seekio Campus - Email Verification',
        html: `
          <h2>Email Verification</h2>
          <p>Your OTP for Seekio Campus signup is:</p>
          <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 4px;">${otpCode}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      };
    } else {
      // For contact form, send to business email
      emailConfig = {
        from: emailMethod?.fromEmail || 'noreply@seekio.in',
        to: emailMethod?.value || 'info@seekio.in',
        subject: `New Contact Form Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailConfig)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};