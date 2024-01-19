document.getElementById('btnIn').addEventListener('click', function() {
    console.log("Button 'IN' clicked");
    document.getElementById('home').style.display = 'none';
    document.getElementById('signInForm').style.display = 'block';
});

document.getElementById('btnOut').addEventListener('click', function() {
    console.log("Button 'OUT' clicked");
    document.getElementById('home').style.display = 'none';
    document.getElementById('visitorList').style.display = 'block';
    displayVisitors();
});
window.onload = function() {
    displayVisitors();
};

function submitForm() {
    console.log("Form submitted");
    const visitorName = document.getElementById('visitorName').value;
    const companyName = document.getElementById('companyName').value;
    const badgeNumber = document.getElementById('badgeNumber').value;
    const signInTime = new Date().toLocaleString();  // Stores the current date and time

    // Save to local storage (or send to server in future implementation)
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    visitors.unshift({ visitorName, companyName, badgeNumber, signInTime });
    localStorage.setItem('visitors', JSON.stringify(visitors));

    // Clear form fields
    document.getElementById('visitorName').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('badgeNumber').value = '';

    // Reset Form and UI
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    displayVisitors(); // Refresh the visitor list
}
function displayVisitors() {
    console.log("Displaying visitors");
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    const listContainer = document.getElementById('visitorList');
    listContainer.innerHTML = ''; // Clear existing entries

    visitors.forEach(visitor => {
        const div = document.createElement('div');
        div.className = 'visitorEntry';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'visitorName';
        nameSpan.textContent = visitor.visitorName;
        div.appendChild(nameSpan);

        div.appendChild(document.createTextNode(` from ${visitor.companyName} - Signed in at ${visitor.signInTime}`));

        if (visitor.badgeNumber) {
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badgeNumber';
            badgeSpan.textContent = ` - Badge # ${visitor.badgeNumber}`;
            div.appendChild(badgeSpan);
        }

        listContainer.appendChild(div);
    });
}


function signOut(visitorIndex) {
    console.log(`Signing out visitor at index ${visitorIndex}`);
    // Update visitor's data with sign-out time and badge number
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    const signOutTime = new Date().toLocaleString();
    visitors[visitorIndex].signOutTime = signOutTime;
    visitors[visitorIndex].badgeNumber = document.getElementById('badgeNumber').value; // Update badge number

    localStorage.setItem('visitors', JSON.stringify(visitors));

    // Redirect to the home page
    window.location.href = 'index.html'; // Replace 'your_home_page.html' with your actual home page URL
}