# Suitable Backend - Django API

A Django REST API backend for the Suitable event booking and ticket management application.

## Features

- **User Authentication**: JWT-based authentication with user registration, login, and profile management
- **Event Management**: Create, read, update, and delete events with categories and ticket types
- **Booking System**: Handle event bookings and ticket purchases
- **Admin Interface**: Django admin for managing all data
- **RESTful API**: Clean REST API endpoints for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### 2. Database Setup

```bash
# Make and run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Populate with sample data
python manage.py populate_sample_data
```

### 3. Run the Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET/PUT /api/auth/profile/` - User profile management

### Events
- `GET /api/events/` - List all events
- `GET /api/events/featured/` - Get featured events
- `GET /api/events/upcoming/` - Get upcoming events
- `GET /api/events/categories/` - List event categories
- `GET /api/events/{id}/` - Get event details

### Bookings
- `GET /api/bookings/` - List user bookings
- `POST /api/bookings/` - Create new booking
- `GET /api/bookings/{id}/` - Get booking details
- `PUT /api/bookings/{id}/` - Update booking
- `DELETE /api/bookings/{id}/` - Cancel booking

## Admin Interface

Access the admin interface at `http://localhost:8000/admin/` to:
- Manage users and profiles
- Create and edit events
- Manage categories
- Handle bookings and tickets
- Monitor system activity

## Database Models

### Users
- **User**: Extended Django user model
- **UserProfile**: Additional user information (phone, address, etc.)

### Events
- **Category**: Event categories (Music, Sports, Technology, etc.)
- **Event**: Main event information
- **TicketType**: Different ticket options for events

### Bookings
- **Booking**: User event bookings
- **Ticket**: Individual tickets for bookings

## Development

### Adding New Features
1. Create models in the appropriate app
2. Add serializers for API responses
3. Create views for business logic
4. Add URL patterns
5. Update admin interface if needed

### Testing
```bash
python manage.py test
```

### Making Changes
```bash
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

For production deployment:
1. Change `DEBUG = False` in settings.py
2. Set a secure `SECRET_KEY`
3. Configure production database (PostgreSQL recommended)
4. Set up proper CORS settings
5. Configure static and media file serving
6. Use environment variables for sensitive settings

## Support

For issues or questions, please refer to the main project documentation or create an issue in the project repository. 