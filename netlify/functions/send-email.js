const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, company, service, message, isOTP, otpCode, isCredentials, credentials, isWelcome, instituteName } = JSON.parse(event.body);

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
    } else if (isCredentials) {
      // For trial credentials
      emailConfig = {
        from: emailMethod?.fromEmail || 'noreply@seekio.in',
        to: email,
        subject: 'Seekio Campus - Trial Account Credentials',
        html: `
          <h2>Welcome to Seekio Campus!</h2>
          <p>Your trial account has been created successfully.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Login Credentials:</h3>
            <p><strong>Email:</strong> ${credentials.email}</p>
            <p><strong>Password:</strong> ${credentials.password}</p>
          </div>
          <p>Your trial will expire in 30 days. You can login at: <a href="https://seekio.in/signup">https://seekio.in/signup</a></p>
          <p>Please keep these credentials safe and change your password after first login.</p>
        `
      };
    } else if (isWelcome) {
      // For welcome email
      emailConfig = {
        from: emailMethod?.fromEmail || 'noreply@seekio.in',
        to: email,
        subject: 'Welcome to Seekio Campus Solutions - Schedule Your Demo Today!',
        html: `
          <h2>Welcome to Seekio Campus Solutions!</h2>
          <p>Dear ${instituteName} Team,</p>
          <p>Congratulations on joining Seekio Campus Solutions! We're excited to help you digitize and streamline your institute's operations.</p>
          
          <h3>🎯 Schedule Your Personal Demo Today</h3>
          <p>Get the most out of your trial with a personalized demo session. Our experts will guide you through:</p>
          <ul>
            <li>Complete platform walkthrough</li>
            <li>Custom setup for your institute</li>
            <li>Best practices and tips</li>
            <li>Q&A session</li>
          </ul>
          
          <h3>📞 Contact Us</h3>
          <p><strong>Email:</strong> <a href="mailto:info@seekio.in">info@seekio.in</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/919140044854">+91 91400 44854</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919140044854">+91 91400 44854</a></p>
          
          <p>We're here to ensure your success with Seekio Campus Solutions!</p>
          <p>Best regards,<br>The Seekio Team</p>
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