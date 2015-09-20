# Download the twilio-python library from http://twilio.com/docs/libraries
from twilio.rest import TwilioRestClient
import sys
 
#joey number =  +15878033122
#counterspam2015 = +15878032907
#counterspam2016 = +16042435291

toNumber = "+15878033122"
text = sys.argv[1]
accountSelected = int(sys.argv[2])

accounts = [
	{'id': 'AC994753d443f924d451da8ac5e731111c', 'token': 'c6ef44efeeccde017df038792f219617', 'number' : '+15878032907'},
	{'id': 'AC49257d5bccb35cbcc4d6290791aa31d3', 'token': '539b8386cd34d3d7c4bcf8cbbc77f994', 'number' : '+16042435291'}
]


client = TwilioRestClient(accounts[accountSelected]['id'], accounts[accountSelected]['token'])

message = client.sms.messages.create(
	body=text,
	to=toNumber,
	from_=accounts[accountSelected]['number']
)
