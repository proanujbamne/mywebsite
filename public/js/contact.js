document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get form data into an object
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                domain: document.getElementById('domain').value,
                message: document.getElementById('message').value,
                source: 'Contact Page' // Identify the source of the submission
            };

            try {
                // Send the data to your new backend endpoint
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    // Show success message
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    successMessage.style.backgroundColor = '#4caf50';
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    form.reset();
                } else {
                    // Show error message
                    successMessage.textContent = 'An error occurred. Please try again.';
                    successMessage.style.backgroundColor = '#f44336';
                    successMessage.style.display = 'block';
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                 // Show error message
                successMessage.textContent = 'A network error occurred. Please try again.';
                successMessage.style.backgroundColor = '#f44336';
                successMessage.style.display = 'block';
            } finally {
                // Hide message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});
