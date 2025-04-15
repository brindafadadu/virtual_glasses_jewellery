document.addEventListener('DOMContentLoaded', () => {
    // Fetch earrings from the backend
    fetchEarrings();
  });
  
  async function fetchEarrings() {
    try {
      const response = await fetch('/api/earrings');
      const earrings = await response.json();
      
      // Display earrings in a selection menu
      displayEarringSelector(earrings);
    } catch (error) {
      console.error('Error fetching earrings:', error);
    }
  }
  
  function displayEarringSelector(earrings) {
    const selectorContainer = document.getElementById('earring-selector');
    
    // Create buttons for each earring
    earrings.forEach(earring => {
      const button = document.createElement('button');
      button.className = 'earring-option';
      button.innerHTML = `
        <img src="${earring.originalImageUrl}" alt="${earring.name}" height="50">
        <span>${earring.name}</span>
      `;
      
      button.addEventListener('click', () => {
        // Update the jewlImage source in earrings.js
        window.selectEarring(earring);
      });
      
      selectorContainer.appendChild(button);
    });
  }