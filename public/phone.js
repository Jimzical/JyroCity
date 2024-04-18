window.onload = function() {
    fetch('/domain')
        .then(response => response.text())
        .then(domain => {
            console.log(domain); // Log the domain

            const ws = new WebSocket(`wss://${domain}`);
            const phoneButton = document.getElementById('phoneButton');
            const alphaElement = document.getElementById('alpha');
            const betaElement = document.getElementById('beta');
            const gammaElement = document.getElementById('gamma');
            
            ws.onopen = () => {
                console.log('WebSocket connection established in phone page');
            };

            ws.onmessage = (event) => {
                console.log(`Received message from server: ${event.data}`);
            };

            let buttonPressed = false;
            let orientationData = { alpha: 0, beta: 0, gamma: 0 };

            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', function(event) {
                    orientationData = {
                        alpha: event.alpha,
                        beta: event.beta,
                        gamma: event.gamma
                    };
                    alphaElement.textContent = event.alpha.toFixed(1);
                    betaElement.textContent = event.beta.toFixed(1);
                    gammaElement.textContent = event.gamma.toFixed(1);
                });
            }

            phoneButton.addEventListener('click', () => {
                buttonPressed = !buttonPressed;
                phoneButton.style.backgroundColor = buttonPressed ? '#16f716' : 'red';
                phoneButton.textContent = buttonPressed ? 'Game Started' : 'Game Paused';
                ws.send(JSON.stringify({ buttonPressed, orientationData }));

                if (buttonPressed) {
                    intervalId = setInterval(() => {
                        ws.send(JSON.stringify({ buttonPressed, orientationData }));
                        // console.log(orientationData.alpha, orientationData.beta, orientationData.gamma);
                    }, 1);
                } else {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            });
        });
};