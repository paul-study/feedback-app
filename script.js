document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            rating: document.getElementById('rating').value,
            feedback: document.getElementById('feedback').value,
            timestamp: new Date().toISOString()
        };
        
        // Disable submit button
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Hide any previous messages
        messageDiv.className = 'message';
        messageDiv.style.display = 'none';
        
        try {
            // Send to Netlify function
            const response = await fetch('/.netlify/functions/submitFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Success
                messageDiv.className = 'message success';
                messageDiv.textContent = result.message || 'Thank you for your feedback!';
                messageDiv.style.display = 'block';
                
                // Reset form
                form.reset();
            } else {
                // Error from server
                throw new Error(result.error || 'Failed to submit feedback');
            }
        } catch (error) {
            // Show error message
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Sorry, something went wrong. Please try again later.';
            messageDiv.style.display = 'block';
            console.error('Error:', error);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
        }
    });
});
