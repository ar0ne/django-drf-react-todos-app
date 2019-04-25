from todoapp.taskapp.celery import app


@app.task
def notify_subscribers_about_weekly_news():
    weekly_news_subscr_id = 1
    from todoapp.user.models import Profile
    for profile in Profile.objects.all_subscribed_to(weekly_news_subscr_id):
        print(f"send email to profile #{profile.id} and subsriptions {profile.subscriptions.all()}")
