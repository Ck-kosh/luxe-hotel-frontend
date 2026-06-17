# Hotel Booking and Online Services System

## Overview

The Luxe-Hotel Booking and Online Services System is a web-based application designed to simplify hotel reservations and enhance customer experience through digital services. The platform allows guests to search for available rooms, make reservations, manage bookings, and access hotel services online. Hotel administrators can efficiently manage rooms, bookings, customers, and service requests through an intuitive dashboard.

## Features

### Customer Features

* User registration and authentication
* Browse available rooms and hotel facilities
* Booking history and reservation tracking
* Profile management
* Service requests (room service, laundry, transportation, etc.)
* Search rooms by type and price
* Online room booking and reservation management
* Secure payment processing


### Administrator Features

* Secure admin login
* Room management (add, update)
* Service request management
* Payment monitoring and reporting
* Occupancy reports
* Booking management
* Customer management


## System Architecture

The system consists of:

* Frontend: User interface for customers and administrators
* Backend: Business logic ,Docker and API services
* Database: Storage for users, rooms, bookings, payments, and services
* Payment Gateway: Secure online transactions

## Technology Stack

### Frontend

* JavaScript
* React 
* Tailwind Css

### Backend

* Python 
* Docker
* FastAPI

### Database

* SQLite

### Other Tools

* Git and GitHub for version control
* Payment Gateway Integration (Daraja/Sandbox)

## Installation

### Prerequisites

* Python3
* SQLite
* Git

### Clone the Repository

```bash
git clone https://github.com/Ck-kosh/luxe-hotel-frontend.git
cd luxe-hotel-frontend
```
```bash
git clone https://github.com/Ck-kosh/luxe-hotel-backend.git
cd luxe-hotel-backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Linux:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start the Server

```bash
uvicorn App:app--reload
```

The application will be available at:

```text
http://127.0.0.0:8000/
```

## Database Entities

### Users

* User ID
* Name
* Email
* Password
* Contact Information

### Rooms

* Room ID
* Room Type
* Capacity
* Price
* Availability Status

### Bookings

* Booking ID
* User ID
* Room ID
* Booking Status

### Payments

* Payment ID
* Booking ID
* Amount
* Payment Status

### Services

* Service ID
* Service Name
* Request Status

## Security Features

* Password hashing
* User authentication and authorization
* Secure payment processing
* Input validation



## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to your branch
5. Create a Pull Request

## License

This project is not licensed.

## Authors

* George Njenga
* Fidelis Njoki
* Joshua Mbilli
* Elias Cheruiyot

## Contact

For any inquiries or support, please contact us at:luxehotel@gmail.com
Developed to provide a seamless hotel booking experience and efficient hotel management operations.
