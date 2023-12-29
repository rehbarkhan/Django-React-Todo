#!/bin/sh
set -e 

echo 'Creating env and installing all the necessary libraries'
if [ -f env ]
then
echo "ENV is present"
else
python3 -m venv env
fi
source env/bin/activate
pip install -r requirements.txt

echo 'Building frontend'
cd ui
npm i
npm run build
cd ..
python manage.py collectstatic --no-input

echo 'Starting the Django app on port 8080'
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8080