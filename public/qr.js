// qr.js
window.onload = function() {
  new QRCode(document.getElementById('qrcode'), {
    text: window.location.href + 'phone',
    width: 128,
    height: 128
  });
};