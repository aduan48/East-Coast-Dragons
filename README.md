East Coast Dragons
A modern React-based web application built for the East Coast Dragons organization. This project features a responsive layout, a persistent user contact form using React hooks paired with Netlify forms backend, and dynamic smooth scrolling.

🚀 Features
Responsive Contact Form: Fully integrated with Netlify forms for serverless submission tracking.

State Persistence: Leverages local storage via custom React hooks (useStorageState) to preserve user input across page refreshes.

Smooth Navigation: Custom viewport offset scrolling to account for fixed header positioning.

Clean UI: Modern, accessible styling using flexbox/grid structures and CSS variables.

🛠️ Built With
Frontend: React (JavaScript, JSX, CSS3)

Hosting & Backend Forms: Netlify

Version Control: Git & GitHub

💻 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have Node.js and npm installed. You can check by running:

Bash
node -v
npm -v
Installation
Clone the repository:

Bash
git clone https://github.com/aduan48/East-Coast-Dragons.git
Navigate into the project directory:

Bash
cd East-Coast-Dragons
Install the dependencies:

Bash
npm install
Running Locally
To launch the local development server:

Bash
npm start
Open http://localhost:3000 in your browser to view the site.

🌐 Deployment
This project is automatically built and deployed via Netlify when changes are pushed to the main branch.

Netlify Forms Configuration
The contact form relies on a shadow HTML form located in public/index.html to allow Netlify’s build bots to register the submission endpoint without relying on an external server API.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.