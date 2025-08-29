#!/usr/bin/env python
"""
Setup script for the Django backend.
Run this script to initialize the database and create sample data.
"""

import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'suitable_backend.settings')

# Setup Django
django.setup()

from django.core.management import execute_from_command_line
from django.contrib.auth.models import User

def main():
    print("🚀 Setting up Suitable Django Backend...")
    
    try:
        # Make migrations
        print("📝 Creating database migrations...")
        execute_from_command_line(['manage.py', 'makemigrations'])
        
        # Run migrations
        print("🗄️  Running database migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        # Create superuser if none exists
        if not User.objects.filter(is_superuser=True).exists():
            print("👑 Creating superuser...")
            execute_from_command_line(['manage.py', 'createsuperuser', '--noinput'])
            print("   Username: admin")
            print("   Email: admin@example.com")
            print("   Password: admin123")
            print("   Please change the password after first login!")
        else:
            print("✅ Superuser already exists")
        
        # Populate with sample data
        print("🎭 Populating database with sample events...")
        execute_from_command_line(['manage.py', 'populate_sample_data'])
        
        print("\n🎉 Setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Start the Django server: python manage.py runserver")
        print("2. Access admin interface: http://localhost:8000/admin/")
        print("3. API endpoints available at: http://localhost:8000/api/")
        print("4. Update your React Native app to connect to: http://localhost:8000")
        
    except Exception as e:
        print(f"❌ Setup failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
