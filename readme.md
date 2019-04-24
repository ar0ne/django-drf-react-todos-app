## Yet another TODOs app [DRF + ReactJS]

`$ python3 -m venv env`

`$ source ./env/bin/activate`

`(env) $ pip install -r requirements/dev.txt`

etc.

`$ cd frontend`

`$ npm i`

`$ npm run dev`

## Ideas

[] Elastic Search
[] Docker / Docker-compose
[] Deployment scripts
[] Nginx
[] Celery for notification about tasks
[] Redis


## Deployment to Apache

See `deployment` directory for details.

```
sudo pip install -r requirements/prod.txt

cd todo-app

python manage.py migrate --run-syncdb --settings=config.settings.production

python manage.py collectstatic --settings=config.settings.production --no-input

python manage.py createsuperuser --settings=config.settings.production

sudo systemctl -l reload httpd.service

sudo systemctl -l status httpd.service

```


## Redis

```
cd todo-app
celery worker -A todoapp.taskapp -l info
```

```
docker run -d -p 6379:6379 redis
```

