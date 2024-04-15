document.addEventListener('DOMContentLoaded', function() {
    const alphaElement = document.getElementById('alpha');
    const betaElement = document.getElementById('beta');
    const gammaElement = document.getElementById('gamma');

    function handleOrientation(event) {
        // Check if the event has the necessary properties
        // If any of the values are null, set them to 0
        const alpha = event.alpha !== null ? Math.round(event.alpha) : 0;
        const beta = event.beta !== null ? Math.round(event.beta) : 0;
        const gamma = event.gamma !== null ? Math.round(event.gamma) : 0;

        // Update the text content of the elements with the orientation values
        alphaElement.textContent = alpha;
        betaElement.textContent = beta;
        gammaElement.textContent = gamma;
    }

    // Check if the device supports the DeviceOrientationEvent API
    if (window.DeviceOrientationEvent) {
        // Listen for the deviceorientation event
        window.addEventListener('deviceorientation', handleOrientation, false);
    } else {
        // If the device does not support the DeviceOrientationEvent API, display a message
        document.querySelector('.info').textContent = "Your device does not support the DeviceOrientationEvent API.";
    }
});
