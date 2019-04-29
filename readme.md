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


## Deployment

See `deployment` directory for details.

```
$ pip install -r requirements/prod.txt

$ cd todo-app

$ python manage.py migrate --run-syncdb --settings=config.settings.production

$ python manage.py collectstatic --settings=config.settings.production --no-input

$ python manage.py createsuperuser --settings=config.settings.production
```

## Redis + Celery

```
$ cd todo-app
$ celery worker -A todoapp.taskapp -l info
$ celery beat -A todoapp.taskapp -l info
```

```
$ docker run -d -p 6379:6379 redis
```

## Email test server

```
python -m smtpd -n -c DebuggingServer localhost:1025
```

## Ideas

* Confirm registration by email (task for celery)

