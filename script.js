// Array of alters

const alters = [
    { name: "Warron", age: 19, role: "Protector", description: "A garlic-bread loving ghost who is the main protector of the system...", image: "images/warron.png", file: "warron.html"},
    { name: "Celestia", age: 0, role: "Caregiver", description: "A gothic fallen-down angel who takes care of the system's littles", image: "images/celestia.png", file: "celestia.html"},
    { name: "Aspen", age: 7, role: "Little", description: "A young boy who loves dinosaurs, often seen with Doctor Felix", image: "images/aspen.png", file: "aspen.html"},
    { name: "Lily", age: 9, role: "Little", description: "A little girl who loves My Little Pony, Five Nights At Freddys, and her daddy", image: "images/lily.jpg", file: "lily.html"},
    { name: "Blythe", age: 10, role: "Little", description: "A hard-of-hearing alter who holds the trauma of Wales.", image: "images/blythe.jpg", file: "blythe.html"},
    { name: "Alice", age: 7, role: "Little", description: "A girl who doesn't understand why her daddy would do bad things", image: "images/alice.jpg", file: "alice.html"},
]

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

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');  // Debugging: Check if DOMContentLoaded is triggered

    const addUpdateButton = document.getElementById('add-update-btn');
    
    if (addUpdateButton) {
        console.log('Add Update button found!');  // Debugging: Check if the button exists
        addUpdateButton.addEventListener('click', function() {
            const updateText = document.getElementById('update-text').value.trim();
            console.log('Button clicked! Update text:', updateText);  // Debugging: Check the value of the input
            // Add your update handling logic here
            saveUpdate(updateText);
            document.getElementById('update-text').value = '';

        });
    } else {
        console.error('Error: Add Update button not found in the DOM');  // Debugging: Button not found error
    }
});


// Load updates on page load
window.addEventListener('DOMContentLoaded', loadUpdates);


document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the dropdown after DOM has loaded
    document.getElementById('filter').addEventListener('change', sortAlters);
});


function displayAlters(alters) {
    const altersContainer = document.getElementById('alters-container');

    // Debug message to check if the alters container exists
    console.log('Alters container:', altersContainer);

    if (!altersContainer) {
        console.error("Error: 'alters-container' element not found");
        return;
    }

    // Clear the container before displaying new alters
    altersContainer.innerHTML = '';

    // Debug message to check the number of alters being displayed
    console.log('Number of alters:', alters.length);

    alters.forEach(alter => {
        // Debug message for each alter
        console.log('Displaying alter:', alter);

        // Create a div for each alter
        const alterBox = document.createElement('div');
        alterBox.classList.add('alter-box');

        // Set the innerHTML with anchor tags for the name and alter's data
        alterBox.innerHTML = `
            <img src="${alter.image}" alt="${alter.name}">
            <h2><a href="${alter.file}" class="alter-link">${alter.name}</a></h2>
            <p>Age: ${alter.age}</p>
            <p>Role: ${alter.role}</p>
        `;

        // Append the alterBox to the altersContainer
        altersContainer.appendChild(alterBox);

        // Debug message to confirm alterBox is added
        console.log('Alter box added for:', alter.name);
    });

    // Final debug message after all alters are displayed
    console.log('All alters displayed');
}

// Function to sort alters alphabetically by name
function sortAltersByName() {
    return alters.sort((a, b) => a.name.localeCompare(b.name));
}


// Load alters and display them when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const sortedAlters = sortAltersByName();

    // Debug message to check sorted alters
    console.log('Sorted Alters:', sortedAlters);

    displayAlters(sortedAlters);
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
