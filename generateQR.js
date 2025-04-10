const qrcode = require('qrcode-terminal');

// The text or URL you want to encode in the QR code
const text = 'https://quotes-app.com';

// Generate QR code in terminal
qrcode.generate(text, { small: true }); 