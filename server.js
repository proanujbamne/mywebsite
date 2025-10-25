// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (your HTML, CSS, frontend JS)
// This tells Express to make files in the root directory accessible
app.use(express.static(path.join(__dirname)));
// Serve CSS files from the CSS directory
app.use('/CSS', express.static(path.join(__dirname, "/CSS")));
app.use(express.static(path.join(__dirname, "public")));
// Serve JS files from the javascript directory
app.use('/javascript', express.static(path.join(__dirname, "public/javascript")));
// Serve image files
app.use('/imgaes', express.static(path.join(__dirname, 'imgaes')));


// Define the path to your data storage file
const dataFilePath = path.join(__dirname, 'data.json');

// route to serve the main HTML file
app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname, "public/index.html"));
});

// POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    // Get the form data from the request body
    const newSubmission = {
        ...req.body,
        submittedAt: new Date().toISOString() // Add a timestamp
    };

    // Read the existing data from the JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            // If the file doesn't exist, create it with the first submission
            if (err.code === 'ENOENT') {
                const initialData = [newSubmission];
                fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing new file:', writeErr);
                        return res.status(500).json({ success: false, message: 'Server error.' });
                    }
                    console.log('Submission saved to new file:', newSubmission);
                    return res.json({ success: true, message: 'Form submitted successfully!' });
                });
                return;
            }
            // For other errors
            console.error('Error reading file:', err);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }

        // If the file exists, parse the data and add the new submission
        let submissions = [];
        try {
            submissions = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).json({ success: false, message: 'Server error: could not parse data file.' });
        }
        
        submissions.push(newSubmission);

        // Write the updated data back to the file
        fs.writeFile(dataFilePath, JSON.stringify(submissions, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }
            console.log('New submission added:', newSubmission);
            res.json({ success: true, message: 'Form submitted successfully!' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
