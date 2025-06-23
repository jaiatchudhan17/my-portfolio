# EmailJS Setup Instructions

To enable the email functionality in your portfolio, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (recommended) or your preferred email provider
4. Follow the setup instructions to connect your Gmail account
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** portfolio_contact

**Subject:** New Contact from Portfolio - {{from_name}}

**Content:**
```
Hello Jai,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (User ID)

## 5. Update the Code
Replace the placeholder values in `script.js`:

```javascript
// Replace these with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY"); // Your Public Key from step 4

// In the sendEmail function, replace:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

With your actual values:
```javascript
emailjs.init("your_actual_public_key");

emailjs.send('your_service_id', 'your_template_id', templateParams)
```

## 6. Test the Contact Form
1. Save all files
2. Refresh your portfolio website
3. Fill out the contact form and submit
4. Check your Gmail inbox for the test email

## Email Limits
- Free EmailJS account: 200 emails/month
- Upgrade to paid plan for higher limits if needed

## Troubleshooting
- Make sure all IDs are correct and match your EmailJS dashboard
- Check browser console for any error messages
- Verify your Gmail account is properly connected to EmailJS
- Ensure your template variables match the ones used in the code

Once set up, visitors can send you emails directly through your portfolio contact form, and you'll receive them in your Gmail inbox at jaiatchuthan@gmail.com.