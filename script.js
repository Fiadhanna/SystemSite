// Function to load updates from localStorage and display them
function loadUpdates() {
    const updatesContainer = document.getElementById('updates-container');
    const storedUpdates = localStorage.getItem('systemUpdates');
    
    // If there are no updates saved, display a message
    if (!storedUpdates) {
        updatesContainer.innerHTML = '<p>No updates yet.</p>';
        return;
    }

    const updates = JSON.parse(storedUpdates);
    updatesContainer.innerHTML = ''; // Clear existing content

    // Loop through each update and display it with a delete button
    updates.forEach((update, index) => {
        const updateElement = document.createElement('div');
        updateElement.classList.add('update');

        // Create the text node for the update
        const updateText = document.createElement('span');
        updateText.textContent = update;

        // Create a delete button
        const deleteButton = document.createElement('img');
        deleteButton.src="images/deletebutton.png";
        deleteButton.alt="Delete"
        deleteButton.classList.add('delete-btn');
        deleteButton.style.width = "25px";
        deleteButton.style.height = "25px";
        deleteButton.addEventListener('click', function() {
            deleteUpdate(index); // Call delete function with the index of the update
        });

        // Append the update text and delete button to the update element
        updateElement.appendChild(updateText);
        updateElement.appendChild(deleteButton);

        // Append the update element to the container
        updatesContainer.appendChild(updateElement);
    });
}

// Function to save an update to localStorage
function saveUpdate(newUpdate) {
    const storedUpdates = localStorage.getItem('systemUpdates');
    let updates = storedUpdates ? JSON.parse(storedUpdates) : [];

    // Add the new update
    updates.push(newUpdate);

    // Save the updated array back to localStorage
    localStorage.setItem('systemUpdates', JSON.stringify(updates));

    // Reload updates to reflect changes
    loadUpdates();
}

// Function to delete an update from localStorage
function deleteUpdate(index) {
    const storedUpdates = localStorage.getItem('systemUpdates');
    let updates = storedUpdates ? JSON.parse(storedUpdates) : [];

    // Remove the update at the specified index
    updates.splice(index, 1);

    // Save the updated array back to localStorage
    localStorage.setItem('systemUpdates', JSON.stringify(updates));

    // Reload updates to reflect changes
    loadUpdates();
}

// Add event listener for the "Add Update" button
document.getElementById('add-update-btn').addEventListener('click', function() {
    const updateText = document.getElementById('update-text').value.trim();
    
    if (updateText === '') {
        alert('Please enter an update.');
        return;
    }

    // Save the update
    saveUpdate(updateText);

    // Clear the input field
    document.getElementById('update-text').value = '';
});

// Load updates on page load
window.addEventListener('DOMContentLoaded', loadUpdates);


document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the dropdown after DOM has loaded
    document.getElementById('filter').addEventListener('change', sortAlters);
});

// Function to sort alters based on selected criteria
function sortAlters(sortBy) {
    // Get the container holding the alter cards
    const altersList = document.getElementById('alters-list');
    
    // Ensure we have the correct alters list element
    if (!altersList) {
        console.error("Alters list container not found!");
        return;
    }
    
    // Get all the alter cards as an array
    const alters = Array.from(altersList.getElementsByClassName('alter-card'));

    if (!alters || alters.length === 0) {
        console.error("No alters found to sort!");
        return;
    }

    // Sort based on the selected value
    alters.sort((a, b) => {
        let aValue = a.getAttribute(`data-${sortBy}`).toLowerCase();
        let bValue = b.getAttribute(`data-${sortBy}`).toLowerCase();

        // Handle numerical sorting for age
        if (sortBy === 'age') {
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
        }

        // Compare values (alphabetical or numerical depending on criteria)
        if (aValue > bValue) {
            return 1;
        } else if (aValue < bValue) {
            return -1;
        } else {
            return 0;
        }
    });

    // Clear the current alters list content
    altersList.innerHTML = '';

    // Append the sorted alters back into the container
    alters.forEach(alter => altersList.appendChild(alter));
}

// Automatically sort by name when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Default sort by name
    sortAlters('name');
});

const gallery = document.querySelector('.gallery-container');

let isScrolling = false;

setInterval(() => {
    if (!isScrolling) {
        gallery.scrollBy({
            left: 300, // Pixels to scroll per interval
            behavior: 'smooth'
        });
    }
}, 3000); // Scroll every 3 seconds

// Pause auto-scrolling when the user is scrolling manually
gallery.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(gallery.scrollTimeout);
    gallery.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);
});
