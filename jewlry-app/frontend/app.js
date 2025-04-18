document.addEventListener('DOMContentLoaded', () => {
    // Fetch earrings from the backend
    fetchEarrings();
    setupUploadButton();
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
    
    const heading = selectorContainer.querySelector('h3');
    const uploadform = document.getElementById('upload-form');

    selectorContainer.innerHTML = '';
   selectorContainer.appendChild(heading);

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

    selectorContainer.appendChild(uploadform);
  }

  function setupUploadButton() {
    const form = document.getElementById('earring-upload-form');
    const statusDiv = document.getElementById('upload-status');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const nameInput = document.getElementById('earring-name');
      const fileInput = document.getElementById('earring-image');
      
      // Show loading status
      statusDiv.className = '';
      statusDiv.textContent = 'Uploading image...';
     
    try {
      console.log('Sending upload request to server...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      console.log('Server response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload error response:', errorData);
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const result = await response.json();
      console.log('Upload success response:', result);
      
      // Show success message
      statusDiv.textContent = 'Earring uploaded successfully!';
      statusDiv.className = 'status-success';
      
      // Reset form
      nameInput.value = '';
      fileInput.value = '';
      
      // Refresh earring list
      fetchEarrings();
      
    } catch (error) {
      console.error('Error uploading earring:', error);
      statusDiv.textContent = `Error: ${error.message}`;
      statusDiv.className = 'status-error';
    }
  });
}  