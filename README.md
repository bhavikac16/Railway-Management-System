#  Railway Management System (Node.js & MySQL)

A simple railway booking system where users can **register, search trains, check seat availability, and book tickets**, while **admins can add new trains**.

---

##  Setup & Installation

### 1️. Clone the Repository
git clone https://github.com/bhavikac16/Railway-Management-System.git cd railway-management-system

shell
Copy
Edit

### 2️. Install Dependencies
npm install

markdown
Copy
Edit

### 3️. Setup MySQL Database
- Create a database:
CREATE DATABASE railway_db;

markdown
Copy
Edit
- Import the required tables (**users, trains, bookings**) using:
USE railway_db;

bash
Copy
Edit

### 4️. Configure `.env` File
Create a `.env` file and add:
PORT=5000 DB_HOST=localhost DB_USER=root DB_PASSWORD=your_mysql_password DB_NAME=railway_db JWT_SECRET=your_secret_key ADMIN_API_KEY=your_admin_api_key

pgsql
Copy
Edit
Replace `your_mysql_password` and `your_admin_api_key` with actual values.

### 5️. Start the Server
node server.js

markdown
Copy
Edit
 **Server runs on:** `http://localhost:5000`

---

##  API Endpoints

###  Authentication
- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login` _(Returns JWT token)_

###  Train Management (Admin Only)
- **Add Train:** `POST /api/trains/add` _(Requires `x-api-key`)_
- **Search Trains:** `GET /api/trains/availability?source=X&destination=Y`

###  Seat Booking (User)
- **Book Seat:** `POST /api/bookings/book` _(Requires JWT token)_
- **View Bookings:** `GET /api/bookings/my-bookings`

---

##  How to Test Using PowerShell

###  Register a User
Invoke-RestMethod -Uri http://localhost:5000/api/auth/register -Method Post -Body (@{name="John"; email="john@example.com"; password="12345"; role="user"} | ConvertTo-Json) -ContentType "application/json"

shell
Copy
Edit

###  Login & Get JWT Token
Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method Post -Body (@{email="john@example.com"; password="12345"} | ConvertTo-Json) -ContentType "application/json"

shell
Copy
Edit

###  Book a Seat (User)
Invoke-RestMethod -Uri http://localhost:5000/api/bookings/book -Method Post -Headers @{ "Authorization"="Bearer your_jwt_token" } -Body (@{train_id=1} | ConvertTo-Json) -ContentType "application/json"

shell
Copy
Edit

###  Add a Train (Admin)
Invoke-RestMethod -Uri http://localhost:5000/api/trains/add -Method Post -Headers @{ "x-api-key"="your_admin_api_key" } -Body (@{train_name="Express"; source="Delhi"; destination="Mumbai"; total_seats=100} | ConvertTo-Json) -ContentType "application/json"

yaml
Copy
Edit

---

##  Notes
- **Admins must use `x-api-key` for train management.**
- **Users must send JWT token in `Authorization` header for seat booking.**
- **Race conditions in seat booking are handled using MySQL transactions.**

---

##  License
This project is **open-source** and free to use.
