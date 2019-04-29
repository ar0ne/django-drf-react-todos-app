from todoapp.mailinglist.models import Message

from django.utils import timezone

from .models import (
    WEEKLY_NEWS,
    CLOSEST_DEADLINES
)

DEADLINE_HTML = 'mailinglist/email/deadline.html'
WEEKLY_NEWS_HTML = 'mailinglist/email/weekly_news.html'

EMAIL_TYPES = {
    WEEKLY_NEWS: (WEEKLY_NEWS_HTML, 'Here is your weekly news'),
    CLOSEST_DEADLINES: (DEADLINE_HTML, "Deadline is coming..."),
}


def build_email_message(email_type, recipient, tasks):
    template, subject = EMAIL_TYPES[email_type]

    body = "<b>Some text from template</b>"
    body += "<ul>"
    body += "".join(["<li>%s</li>" % task for task in tasks])
    body += "</ul>"

    # generating email body ...

    return Message.objects.create(subject=subject,
                                  recipient=recipient,
                                  body=body,
                                  created=timezone.now())
