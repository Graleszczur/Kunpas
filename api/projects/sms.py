import boto3
from api.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from django.core.mail import EmailMessage

def sendSms(number, message):
    client = boto3.client(
        "sns",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name="eu-west-1"
    )


    client.publish(
        PhoneNumber=number, #+48111555999
        Message=message
    )

def sendEmail(email, title, message):
    email = EmailMessage(title, message, to=[email])
    email.send()
