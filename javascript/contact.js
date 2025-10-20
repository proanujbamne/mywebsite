const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', function(e) {
            alert('Form submission done.');
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                domain: document.getElementById('domain').value,
                message: document.getElementById('message').value
            };

            // Store in memory (you can replace this with your actual submission logic)
            console.log('Form submitted:', formData);

            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        });