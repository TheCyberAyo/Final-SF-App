# 🚀 Suitable App - Complete Setup Guide

This guide will help you set up the React Native frontend for your event booking and ticket management application.

## 📋 Prerequisites

- Python 3.8+ installed
- Node.js 18+ and npm installed
- Expo CLI installed (`npm install -g @expo/cli`)
- Git installed

## 🗄️ Django Backend Setup

### 1. Navigate to Django Backend Directory
```bash
cd django-backend
```

### 2. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Setup Script
```bash
python setup.py
```

This will:
- Create database migrations
- Set up the database
- Create a superuser (admin/admin123)
- Populate with sample events and categories

### 5. Start Django Server
```bash
python manage.py runserver
```

Your Django backend will be running at `http://localhost:8000`

## 📱 React Native Frontend Setup

### 1. Navigate to React Native Directory
```bash
cd Suitable
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Expo Development Server
```bash
npm start
```

## 🔗 Integration Points

### Current Flow:
1. **Welcome Screen** → User clicks "Get Started"
2. **Authentication** → User signs up/logs in
3. **Landing Page** → User sees events with "Book Now" and "Buy Tickets" buttons
4. **Booking Flow** → User can book events and purchase tickets

### API Endpoints Available:
- **Authentication**: `/api/auth/register/`, `/api/auth/login/`
- **Events**: `/api/events/`, `/api/events/featured/`
- **Bookings**: `/api/bookings/`, `/api/bookings/tickets/`

## 🎯 Key Features Implemented

### Django Backend:
✅ User authentication with JWT tokens  
✅ Event management with categories  
✅ Ticket types and pricing  
✅ Booking system  
✅ Admin interface  
✅ RESTful API endpoints  

### React Native Frontend:
✅ Welcome screen with authentication flow  
✅ Landing page with event browsing  
✅ Category filtering  
✅ Featured events display  
✅ Booking and ticket buttons  
✅ Responsive design  

## 🔧 Configuration

### Django Settings:
- Database: SQLite (development)
- CORS: Enabled for development
- JWT tokens: 60 minutes access, 1 day refresh
- Admin: `http://localhost:8000/admin/`

### React Native Settings:
- API Base URL: `http://localhost:8000` (update in your API service)
- Navigation: Expo Router with tab-based layout
- Styling: Responsive design with custom hooks

## 🚀 Next Steps

### 1. Connect Frontend to Backend
Update your React Native app to make actual API calls to Django instead of using mock data.

### 2. Implement Missing Pages
Create the following pages that are referenced in the landing page:
- `/event/[id]` - Event details page
- `/booking/[id]` - Booking page
- `/tickets/[id]` - Ticket purchase page
- `/my-bookings` - User's bookings
- `/my-tickets` - User's tickets

### 3. Add Payment Integration
Integrate a payment gateway (Stripe, PayPal, etc.) for ticket purchases.

### 4. Push Notifications
Add push notifications for booking confirmations and event reminders.

### 5. Image Upload
Implement image upload for events and user profiles.

## 🐛 Troubleshooting

### Django Issues:
- **Port already in use**: Change port in `manage.py runserver 8001`
- **Migration errors**: Delete `db.sqlite3` and run setup again
- **Import errors**: Ensure virtual environment is activated

### React Native Issues:
- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **API connection**: Check if Django server is running
- **Navigation errors**: Ensure all referenced routes exist

## 📚 API Documentation

### Authentication:
```bash
# Register
POST /api/auth/register/
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "first_name": "John",
  "last_name": "Doe"
}

# Login
POST /api/auth/login/
{
  "username": "user123",
  "password": "password123"
}
```

### Events:
```bash
# Get all events
GET /api/events/

# Get featured events
GET /api/events/featured/

# Get event details
GET /api/events/{id}/
```

### Bookings:
```bash
# Create booking
POST /api/bookings/
{
  "event": 1,
  "ticket_type": 1,
  "quantity": 2,
  "special_requests": "VIP seating preferred"
}

# Get user bookings
GET /api/bookings/
```

## 🎉 You're All Set!

Your Django backend and React Native frontend are now ready to work together. The landing page will show events with booking and ticket buying functionality, and users will be redirected there after logging in.

Start with the Django backend first, then test the React Native app. Once everything is working, you can replace the mock data with real API calls to create a fully functional event booking application!
