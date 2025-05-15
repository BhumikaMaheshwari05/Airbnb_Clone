# Homistay - Airbnb Clone

A full-stack web application that mimics Airbnb’s core functionalities. Users can browse, list, and book properties such as homes, resorts, and apartments.

---

## Features

- User authentication and authorization (register, login, logout)
- Create, read, update, and delete property listings
- Upload images for listings
- View detailed listing pages with descriptions, price, and location
- Responsive UI with filters for different property types
- Flash messages for success and error feedback
- Server running on port 8081

---

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS templating, Bootstrap, Font Awesome
- **File Upload:** Multer
- **Authentication:** Passport.js
- **Others:** Connect-flash for flash messages, Express-session for sessions

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/BhumikaMaheshwari05/Homistay.git
   cd Homistay
   
2. Install dependencies:
   ```bash
   npm install
   
3. Set up environment variables:
   Create a .env file in the root directory with the following content:
   
   -PORT=8081
   -DB_URL=mongodb://localhost:27017/homistay
   -SECRET=yourSessionSecret
   
5. Start the server:
   ```bash
 
   npm start


7. Open your browser and navigate to:
   http://localhost:8081

## Usage
-Register a new account or log in to start browsing and managing listings.
-Use filters to search for properties by type or location.
-Add new property listings with images and details.
-Edit or delete your own listings.
-View detailed information for each property, including pricing and location

For any questions or support, please reach out to bhumika.maheshwari29@gmail.com.
