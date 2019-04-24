## Yet another TODOs app [DRF + ReactJS]

`$ python3 -m venv env`

`$ source ./env/bin/activate`

`(env) $ pip install -r requirements.dev.txt`

etc.

`$ cd frontend`

`$ npm i`

`$ npm run dev`

## Ideas

[] Elastic Search
[] Docker / Docker-compose
[] Deployment scripts
[] Nginx or Apache ?
[] Celery for notification about tasks
[] Redis


## Deployment to Apache

```
sudo pip install -r requirements/requirements.prod.txt

cd todo-app

python manage.py migrate --settings=config.settings.production

python manage.py collectstatic --settings=config.settings.production --no-input


sudo systemctl -l reload httpd.service


sudo systemctl -l status httpd.service

```