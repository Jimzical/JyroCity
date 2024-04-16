setInterval(() => {
    const x_data = Math.random();
    const y_data = Math.random();
  
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x_data, y_data }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Data sent successfully');
      })
      .catch(error => {
        console.error('There was a problem sending data:', error);
      });
  }, 1000);