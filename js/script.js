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
    const signInTime = new Date().toLocaleString();  

    
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    visitors.unshift({ visitorName, companyName, badgeNumber, signInTime });
    localStorage.setItem('visitors', JSON.stringify(visitors));

   
    document.getElementById('visitorName').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('badgeNumber').value = '';

   
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    displayVisitors(); 
}
function displayVisitors() {
    console.log("Displaying visitors");
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    const listContainer = document.getElementById('visitorList');
    listContainer.innerHTML = ''; 

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
   
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    const signOutTime = new Date().toLocaleString();
    visitors[visitorIndex].signOutTime = signOutTime;
    visitors[visitorIndex].badgeNumber = document.getElementById('badgeNumber').value; 

    localStorage.setItem('visitors', JSON.stringify(visitors));

    
    window.location.href = 'index.html'; 
}
