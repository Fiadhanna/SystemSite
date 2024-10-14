document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Sample data for alters (you can replace this with your actual data)
    const alters = [
        { name: 'Alter One', age: 10, role: 'Helper', file: 'alter1.html' },
        { name: 'Alter Two', age: 12, role: 'Protector', file: 'alter2.html' },
        // Add more alters as needed
    ];

    const altersContainer = document.getElementById('alters-container');

    alters.forEach(alter => {
        // Create a container for each alter
        const alterDiv = document.createElement('div');
        alterDiv.classList.add('alter');

        // Create an anchor element for the alter name
        const alterLink = document.createElement('a');
        alterLink.href = alter.file;  // Link to the specific alter page
        alterLink.textContent = `${alter.name}`;  // Display alter's name
        alterLink.classList.add('alter-link');  // Optional: add a class for styling

        // Append the link to the alter div
        alterDiv.appendChild(alterLink);
        alterDiv.appendChild(alterDescription);  // Append description below the name

        // Append the alter div to the container
        altersContainer.appendChild(alterDiv);
    });
});
