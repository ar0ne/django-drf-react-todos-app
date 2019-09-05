## Intro

This's Yet another TODOs app based on DRF and ReactJS.

### Build

`$ python3 -m venv env`

`$ source ./env/bin/activate`

`(env) $ pip install -r requirements/dev.txt`

etc.

`$ cd frontend`

`$ npm i`

`$ npm run dev`

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

*Note*: Check that django config has next value: *'DJANGO_EMAIL_BACKEND': 'django.core.mail.backends.smtp.EmailBackend'*. 

If you use 'django.core.mail.backends.console.EmailBackend', it will not receive any emails.

```
$ python -m smtpd -n -c DebuggingServer localhost:1025
```

### Draw class diagram

If you'd like to get class diagram of the application, check that you 
have required libs (e.g. [pygraphviz](https://django-extensions.readthedocs.io/en/latest/graph_models.html)

```
$ sudo pacman -S graphviz
```
And then you could generate class diagram image by:
```
$ python manage.py graph_models -a -g -o ../class_diagram.png
```


