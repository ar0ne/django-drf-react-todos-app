from datetime import timedelta

from django.utils import timezone

from django.conf import settings
from django.core.mail import send_mail

from todoapp.taskapp.celery import app
from todoapp.mailinglist import emails

from todoapp.mailinglist.models import (
    WEEKLY_NEWS,
    CLOSEST_DEADLINES
)

# @app.task
# def notify_subscribers_about_weekly_news():
#     from todoapp.user.models import Profile
#     for profile in Profile.objects.all_subscribed_to(WEEKLY_NEWS):
#         print(f"send email to profile #{profile.id} and subscriptions {profile.subscriptions.all()}")
#

@app.task
def notify_subscribers_about_closest_deadlines():
    from todoapp.user.models import Profile
    from todoapp.basket.models import Basket

    next_week = timezone.now() + timedelta(days=7)

    ''' @TODO: maybe make email field required ? '''
    profiles = Profile.objects.all_subscribed_to(CLOSEST_DEADLINES).exclude(user__email='')

    for profile in profiles:
        tasks = Basket.get_tasks_for_user_with_deadline_until(profile.user.id, next_week)
        if len(tasks) > 0:
            create_email_about_deadlines.delay(profile.user.id, tasks)


@app.task
def create_email_about_deadlines(profile_id, tasks):
    from todoapp.user.models import Profile
    recipient = Profile.objects.get(pk=profile_id)
    message = emails.build_email_message(CLOSEST_DEADLINES, recipient, tasks)
    send_email_notification.delay(message.id)


@app.task
def send_email_notification(message_id):
    from todoapp.mailinglist.models import Message
    message = Message.objects.get(pk=message_id)

    success = send_mail(
        subject=message.subject,
        message=message.body,
        from_email=settings.MAILING_LIST_FROM_EMAIL,
        recipient_list=(message.recipient.user.email,),
        html_message=message.body
    )

    if success == 1:
        message.sent = True
        message.save()



