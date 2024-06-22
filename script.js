document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const statusElement = document.getElementById('status');
    
    if (fileInput.files.length === 0) {
        statusElement.textContent = 'Please select a file.';
        statusElement.classList.add('text-danger');
        return;
    }

    const file = fileInput.files[0];

    if (file.type !== 'application/json') {
        statusElement.textContent = 'Please upload a valid JSON file.';
        statusElement.classList.add('text-danger');
        return;
    }

    try {
        const fileContent = await file.text();
        const jsonData = JSON.parse(fileContent);

        console.log('JSON Data:', jsonData); // Log the JSON data to the console

        // Replace with your actual API endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            statusElement.textContent = 'File uploaded successfully!';
            statusElement.classList.remove('text-danger');
            statusElement.classList.add('text-success');
            console.log('Response:', await response.json()); // Log the API response to the console
        } else {
            statusElement.textContent = 'Failed to upload file.';
            statusElement.classList.add('text-danger');
            console.error('Error Response:', await response.text()); // Log the error response to the console
        }
    } catch (error) {
        statusElement.textContent = 'An error occurred: ' + error.message;
        statusElement.classList.add('text-danger');
        console.error('Error:', error); // Log the error to the console
    }
});
