document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('btnIn').addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('signInForm').style.display = 'block';
        document.getElementById('clearListButton').style.display = 'none';
    });

    document.getElementById('btnOut').addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('visitorList').style.display = 'block';
        document.getElementById('clearListButton').style.display = 'block';
        displayVisitors();
    });

    var closeSpan = document.getElementsByClassName("close-button")[0];
    closeSpan.onclick = function() {
        var modal = document.getElementById("signOutModal");
        modal.style.display = "none";
    };
});


window.onload = function() {
    displayVisitors();
};


function submitForm() {
    const visitorName = document.getElementById('visitorName').value;
    const companyName = document.getElementById('companyName').value;
    const badgeNumber = document.getElementById('badgeNumber').value;
    const personToSee = document.getElementById('personToSee').value;
    const signInTime = new Date().toLocaleString();

    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    visitors.unshift({ visitorName, companyName, badgeNumber, signInTime, personToSee });
    localStorage.setItem('visitors', JSON.stringify(visitors));

    document.getElementById('visitorName').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('badgeNumber').value = '';

    displayVisitors();

    
    updateModalContent("Thank You", `Thank you - ${personToSee} has been notified.`);
    showModalForDuration(5000);

    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('clearListButton').style.display = 'none'; 
}


function showThankYouModal(personToSee) {
    var modal = document.getElementById("signOutModal");

    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = "signOutModal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2 id="modalMessage">Thank you</h2>
            </div>`;
        document.body.appendChild(modal);

       
        var span = modal.getElementsByClassName("close-button")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    
    document.getElementById('modalMessage').textContent = `Thank you - ${personToSee} has been notified.`;
    modal.style.display = "block";
}



function displayVisitors() {
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    const listContainer = document.getElementById('visitorList');

    // Clear the list container
    listContainer.innerHTML = '';

    // Iterate through visitors
    visitors.forEach((visitor, index) => {
        const div = document.createElement('div');
        div.className = 'visitorEntry';
        div.addEventListener('click', function() {
            signOut(index);
        });

        const nameSpan = document.createElement('span');
        nameSpan.className = 'visitorName';
        nameSpan.textContent = visitor.visitorName;
        div.appendChild(nameSpan);

        const visitorInfo = document.createTextNode(
            ` from ${visitor.companyName} - Signed in at ${visitor.signInTime}`
        );
        div.appendChild(visitorInfo);

        if (visitor.signOutTime) {
            const signOutInfo = document.createElement('span');
            signOutInfo.className = 'signOutTime';
            signOutInfo.textContent = ` - Signed out at ${visitor.signOutTime}`;
            div.appendChild(signOutInfo);
        }

        if (visitor.badgeNumber) {
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badgeNumber';
            badgeSpan.textContent = ` - Badge # ${visitor.badgeNumber}`;
            div.appendChild(badgeSpan);
        }

        listContainer.appendChild(div);
    });

    // Add "Clear List" button at the bottom
    const clearListButton = document.createElement('button');
    clearListButton.id = 'clearListButton';
    clearListButton.textContent = 'Clear';
    clearListButton.addEventListener('click', function() {
        var password = prompt("Please enter the password to clear the list:");
        if (password === "123") {
            localStorage.setItem('visitors', JSON.stringify([]));
            displayVisitors();
            alert("Visitor list cleared.");
        } else {
            alert("Incorrect password. The list was not cleared.");
        }
    });

    listContainer.appendChild(clearListButton);
}




function signOut(visitorIndex) {
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];

    if (visitors[visitorIndex]) {
        visitors[visitorIndex].signOutTime = new Date().toLocaleString();
        localStorage.setItem('visitors', JSON.stringify(visitors));
        displayVisitors();

        document.getElementById('visitorList').style.display = 'none';
        document.getElementById('home').style.display = 'block';

        updateModalContent("Sign Out Successful", "Thank you for visiting Norka!");
        showModalForDuration(5000);
    } else {
        console.error('Visitor not found');
    }
}
function updateModalContent(title, message) {
    var modal = document.getElementById("signOutModal");
    if (!modal) {
        modal = createModal();
    }
    modal.querySelector('h2').textContent = title;
    modal.querySelector('p').textContent = message;
}

function showModalForDuration(duration) {
    var modal = document.getElementById("signOutModal");
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.display = "none";
    }, duration);
}

function createModal() {
    var modal = document.createElement('div');
    modal.id = "signOutModal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2></h2>
            <p></p>
        </div>`;
    document.body.appendChild(modal);

    var span = modal.getElementsByClassName("close-button")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    return modal;
}
document.getElementById('clearListButton').addEventListener('click', function() {
    var password = prompt("Please enter the password to clear the list:");
    if (password === "123") {
        localStorage.setItem('visitors', JSON.stringify([])); 
        displayVisitors(); 
        alert("Visitor list cleared.");
    } else {
        alert("Incorrect password. The list was not cleared.");
    }
});

