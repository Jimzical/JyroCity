// qr.js
window.onload = function() {
  new QRCode(document.getElementById('qrcode'), {
    text: window.location.href + 'phone',
    width: 256,
    height: 256
  });
};