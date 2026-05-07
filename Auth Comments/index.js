// 1. Configuration: Note the /api prefix based on our Controller @RequestMapping
const API_BASE_URL = "http://localhost:8080/api";

// 2. Handle Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            username: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Registration successful! Please login.");
                window.location.href = "index.html";
            } else {
                const errorMsg = await response.text(); // Using .text() because our backend returns a String
                alert(`Registration failed: ${errorMsg}`);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    });
}

// 3. Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const credentials = {
            username: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('authToken', token);
                alert("Login successful!");
                window.location.href = "comment.html";
            } else {
                alert("Invalid credentials.");
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    });
}

// 4. Handle Comment Submission (1:1 Logic)
const commentForm = document.getElementById('commentForm');
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        const commentText = document.getElementById('comment-text').value;

        try {
            const response = await fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(commentText)
            });

            if (response.status === 400) {
                const errorMsg = await response.text();
                alert(errorMsg);
            } else if (response.ok) {
                alert("Comment posted!");
            } else {
                alert("Failed to post comment. Ensure you are logged in.");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    });
}


const form = document.getElementById('comment-form');
const list = document.getElementById('comment-list');
const input = document.getElementById('comment-input');

// 1. Load existing comments from localStorage on page load
window.onload = () => {
    const savedComments = JSON.parse(localStorage.getItem('myComments')) || [];
    savedComments.forEach(text => addCommentToDOM(text));
};

// 2. Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents page from reloading
    const commentText = input.value;

    addCommentToDOM(commentText); // Show on page
    saveComment(commentText);     // Save to memory
    input.value = '';             // Clear input field
});

// Function to create the HTML for a new comment
function addCommentToDOM(text) {
    const div = document.createElement('div');
    div.className = 'comment-box';
    div.innerText = text;
    list.prepend(div); // Adds newest comment to the top
}

// Function to save comments to the browser
function saveComment(text) {
    const comments = JSON.parse(localStorage.getItem('myComments')) || [];
    comments.push(text);
    localStorage.setItem('myComments', JSON.stringify(comments));
}

