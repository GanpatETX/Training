
const API_BASE_URL = "http://localhost:8080/api";

const commentForm = document.getElementById('comment-form');

if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        // 1. Get the text using the ID from YOUR HTML (comment-input)
        const commentText = document.getElementById('comment-input').value;
        const commentList = document.getElementById('comment-list');

        try {
            const response = await fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                // Send the raw string wrapped in JSON quotes
                body: JSON.stringify(commentText),
                // Essential for standard Spring Security sessions
                credentials: 'include' 
            });

            if (response.ok) {
                const data = await response.json();
                
                // 2. Display the comment on your page
                commentList.innerHTML = `<div class="comment-item">
                    <strong>Your Comment:</strong>
                    <p>${data.content}</p>
                </div>`;
                
                alert("Comment posted successfully!");
                commentForm.reset(); 
            } else {
                const errorMsg = await response.text();
                alert(errorMsg); // Should show "You can only post one comment!"
            }
        } catch (err) {
            console.error("Connection failed:", err);
            alert("Could not connect to the server.");
        }
    });
}



//UUID Process is begain
let isProcessing = false;

function generateUniqueUUID() {
    // If a click is already being processed, ignore this one
    if (isProcessing) return;

    // Lock the function
    isProcessing = true;

    // Generate the UUID
    const newUUID = crypto.randomUUID();
    console.log("Generated UUID:", newUUID);

    // Display it on your page
    document.getElementById('uuid-display').innerText = newUUID;

    // Unlock after a short delay (e.g., 500ms) to allow the next intentional click
    setTimeout(() => {
        isProcessing = false;
    }, 5000); 
}

// Attach to your button
document.getElementById('uuid-btn').addEventListener('click', generateUniqueUUID);

btn.addEventListener('click', () => {
    const id = crypto.randomUUID();
    display.innerText = id;
    
    btn.disabled = true; // Stop more clicks
    setTimeout(() => btn.disabled = false, 500); // Re-enable later
});
