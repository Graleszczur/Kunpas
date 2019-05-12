import boto3
from api.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

def send(number, message):
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
