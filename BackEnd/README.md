Getting Started with Django

This project is set up using Django, a high-level Python web framework.

Available Commands

In the project directory, you can run:

python -m venv env

Creates a virtual environment to manage dependencies.

source env/bin/activate (Mac/Linux) or env\Scripts\activate (Windows)

Activates the virtual environment.

pip install -r requirements.txt

Installs all required dependencies from the requirements.txt file.

python manage.py runserver

Runs the development server.

Open http://127.0.0.1:8000 to view the project in your browser.

The server will restart automatically when you make changes.

Any errors will be displayed in the console.

python manage.py migrate

Applies database migrations to ensure the database schema is up to date.

python manage.py createsuperuser

Creates an admin user for the Django Admin Panel.

python manage.py collectstatic

Collects static files for production deployment.

Deployment

For production, consider using Gunicorn and Nginx or deploying via Heroku, AWS, or DigitalOcean.

Your Django project is now ready to be built and deployed!

