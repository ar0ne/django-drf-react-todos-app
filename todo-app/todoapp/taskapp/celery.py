import os

from django.conf import settings
from django.apps import apps, AppConfig
from celery import Celery

if not settings.configured:
    # set the default Django settings module for the 'celery' program.
    os.environ.setdefault(
        "DJANGO_SETTINGS_MODULE", "config.settings.dev"
    )  # pragma: no cover

app = Celery('todoapp')
app.config_from_object('django.conf:settings', namespace='CELERY')


class CeleryAppConfig(AppConfig):
    name = "todoapp.taskapp"
    verbose_name = "Celery Config"

    def ready(self):
        installed_apps = [app_config.name for app_config in apps.get_app_configs()]
        app.autodiscover_tasks(lambda: installed_apps, force=True)

        app.conf.beat_schedule = {
            'debug-task-every-60-seconds': {
                'task': 'todoapp.mailinglist.tasks.notify_subscribers_about_closest_deadlines',
                'schedule': 60.0,
            }
        }


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")  # pragma: no cover
