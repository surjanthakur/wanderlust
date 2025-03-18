# Wanderlust - Airbnb Clone

Wanderlust is a full-stack web application that replicates the core functionalities of Airbnb. It allows users to browse, book, and list properties for rent. The project is built using the MERN stack with EJS for templating.

## Features
- **User Authentication & Authorization**: Sign up, login, and logout functionality with session-based authentication.
- **Listing Properties**: Users can add, update, and delete property listings.
- **Property Details**: View detailed descriptions, images, and pricing of properties.
- **User Dashboard**: Users can manage their listings and bookings.
- **Responsive Design**: Mobile-friendly UI built with Bootstrap.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating Engine**: EJS (Embedded JavaScript)
- **Authentication**: Passport.js with sessions and bcrypt for password hashing
- **Middleware**: Express-session, Connect-flash, and Method-Override
- **Deployment**: Hosted on Render/Vercel with MongoDB Atlas

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file and configure the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```
4. **Run the Application**
   ```bash
   npm start
   ```
   The app will be live at `http://localhost:3000`

## Folder Structure
```
wanderlust/
│-- models/           # Mongoose models for User and Listings
│-- routes/           # Express routes for authentication and CRUD operations
│-- views/            # EJS templates for rendering UI
│-- public/           # Static assets (CSS, images, JS)
│-- app.js            # Main server file
│-- .env              # Environment variables
│-- package.json      # Dependencies and scripts
```

## Future Improvements
- Integrate payment gateway for bookings
- Add user reviews and ratings
- Implement an advanced search and filter feature

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

---
### Happy Coding! 🚀

