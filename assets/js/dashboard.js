function updateClickCount() {
  fetch('http://localhost:3000/api/click-count')
    .then(response => response.json())
    .then(data => {
      const clickCount1 = document.getElementById('clickCount1');

      
      clickCount1.textContent = data.count;
      
    })
    .catch(error => console.error(error));
}

function updateClickCount1() {
  fetch('http://localhost:3000/donate')
    .then(response => response.json())
    .then(data => {

      const clickCount2 = document.getElementById('clickCount2');

      
      clickCount2.textContent = data.count;
      
    })
    .catch(error => console.error(error));
}

function updateClickCount2() {
  fetch('http://localhost:3000/live',{
    headers: {
   
      'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace with your frontend URL
    }
  })
    .then(response => response.json())
    .then(data => {

      const clickCount3 = document.getElementById('clickCount3');
      
      clickCount3.textContent = data.count;
    })
    .catch(error => console.error(error));
}

// Fetch the click count initially
function updateclickcounts () {
updateClickCount();
updateClickCount1();
updateClickCount2();
}


updateclickcounts();
// Refresh the click count every few seconds
setInterval(updateclickcounts, 5000);
