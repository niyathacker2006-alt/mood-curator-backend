// app.js
window.saveJournal = async () => {
    const mood = document.getElementById('mood').value;
    const content = document.getElementById('content').value;
    
    // 1. Get the VIP pass from memory
    const token = localStorage.getItem('moodToken');

    if (!token) {
        alert("You must be logged in!");
        window.location.href = "index.html";
        return;
    }

    try {
        // 2. Send the data AND the token to your backend
        const response = await fetch('http://localhost:5000/api/journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <-- This is the magic line
            },
            body: JSON.stringify({ mood, content })
        });

        if (response.ok) {
            alert("Journal saved to MongoDB!");
            document.getElementById('content').value = ""; // Clear the box
        } else {
            const data = await response.json();
            alert("Failed to save: " + data.error);
        }
    } catch (error) {
        console.error("Error saving journal:", error);
    }
};

window.logout = () => {
    // To log out, we just destroy the token!
    localStorage.removeItem('moodToken');
    window.location.href = "index.html";
};