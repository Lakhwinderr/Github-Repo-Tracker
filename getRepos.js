// 📄 getRepos.js
// This script fetches all public repositories for a given GitHub user and saves selected info to a CSV file.

// ==============================
// 🌱 1. Import Dependencies
// ==============================
require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs'); // File system module (not used directly here)
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // For writing CSV files

// ==============================
// 🔑 2. Setup Credentials
// ==============================
const username = process.env.GITHUB_USERNAME; // GitHub username from .env
const token = process.env.GITHUB_TOKEN; // GitHub personal access token from .env

// Prepare headers for authentication if token is provided
const headers = token
    ? { Authorization: `token ${token}` }
    : {};

// ==============================
// 📋 3. Configure CSV Writer
// ==============================
const csvWriter = createCsvWriter({
    path: 'github_repos.csv', // Output CSV file path
    header: [
        { id: 'name', title: 'Name' },
        { id: 'clone_url', title: 'Clone URL' },
        { id: 'description', title: 'Description' },
        { id: 'updated_at', title: 'Updated At' },
    ],
});

// ==============================
// 🚀 4. Fetch and Save Repositories
// ==============================
async function getRepos() {
    try {
        // Fetch repositories from GitHub API (max 100 per page)
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        const repos = await response.json();

        // Map relevant fields for CSV
        const data = repos.map(repo => ({
            name: repo.name,
            clone_url: repo.clone_url,
            description: repo.description || '',
            updated_at: repo.updated_at,
        }));

        // Write data to CSV file
        await csvWriter.writeRecords(data);
        console.log('✅ Repository list saved to github_repos.csv');
    } catch (err) {
        // Handle errors (e.g., network issues, API errors)
        console.error('❌ Error fetching repositories:', err.message);
    }
}

// ==============================
// 🏁 5. Run the Script
// ==============================
getRepos();
