// public/main.js
// Function to open the modal and display the certificate
function openModal(certificate) {
    const modal = document.getElementById('certificateModal');
    const overlay = document.getElementById('overlay');

    // Set the content of the modal
    modal.innerHTML = `
        <pre>${certificate.certificate}</pre>
        <button id="closeButton">Close</button>
    `;

    // Show the modal and overlay
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Attach a click event listener to the close button
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => closeModal());
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('certificateModal');
    const overlay = document.getElementById('overlay');

    // Hide the modal and overlay
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Fetch the list of certificates from the server
fetch('/all-certificates')
    .then(response => response.json())
    .then(certificates => {
        const certificateList = document.getElementById('certificateList');

        certificates.forEach(certificate => {
            const row = certificateTable.insertRow();
            // Create cells for each property
            for (const key in certificate) {
                if (Object.hasOwnProperty.call(certificate, key) && key !== 'certificate') {
                    const cell = row.insertCell();
                    cell.textContent = certificate[key];
                }
            }
    
            // Add a button cell for the View Certificate button
            const viewButtonCell = row.insertCell();
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Certificate';
    
            // Attach a click event listener to the View Certificate button
            viewButton.addEventListener('click', () => openModal(certificate));
            viewButtonCell.appendChild(viewButton);

            // Add a button cell for the "Delete" button
            const deleteButtonCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            
            // Attach a click event listener to the "Delete" button
            deleteButton.addEventListener('click', () => deleteCertificate(certificate.id));
            deleteButtonCell.appendChild(deleteButton);    
        });
        
    })
    .catch(error => {
        console.error('Error fetching certificate list:', error);
        alert('Error fetching certificate list.');
    });

// Function to delete a certificate
function deleteCertificate(certificateId) {
    debugger;
    // Send a DELETE request to the server to delete the certificate
    fetch(`/certificates/delete/${certificateId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Optionally, you can remove the deleted certificate from the UI
        location.reload();
    })
    .catch(error => {
                 console.error('Error fetching certificate list:', error);
                 alert('Error fetching certificate list.');
    });
}


