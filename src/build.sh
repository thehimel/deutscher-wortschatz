cd client && npm install --force && npx vite build && rm -rf node_modules && cd ..
python3.9 -m pip install --upgrade pip setuptools
pip install -r requirements.txt
python3.9 manage.py collectstatic --no-input
python3.9 manage.py migrate
