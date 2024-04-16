fetch('http://localhost:3000/events', { mode: 'no-cors' })
  .then(response => {
    const eventSource = new EventSource(URL.createObjectURL(response.body));
    const dataContainer = document.getElementById('data-container');

    eventSource.onopen = (event) => {
      console.log('Connection to server opened.');
    };

    eventSource.onerror = (event) => {
      console.error('EventSource failed:', event);
    };

    eventSource.onmessage = (event) => {
      try {
        const { x_data, y_data } = JSON.parse(event.data);
        console.log('Received data in game.js:', x_data, y_data);

        // Update the data container with the received data
        dataContainer.textContent = `x_data: ${x_data}\ny_data: ${y_data}`;
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    };
  })
  .catch(error => console.error('Fetch failed:', error));