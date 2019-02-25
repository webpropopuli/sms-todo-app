#An SMS-based Todo List and Resume Server, David Marlowe

## Description

Using a self-hosted Express server and the Twilio messaging API, this is an SMS ToDo list. By sending a test, users can ADD and DEL items and LIST all items. Unknown/ambiguous text will return the app instructions and the caller can also request my resume by texting RES.

## Setup and Deploy

The app lives at 401-324-0900

### Twilio:

Each time you change your server location, you have to tell Twilio about the change. Select your phone number, then under 'Messaging' and 'A message comes in', set it to 'Webhook' and your server's path and port. Either use the ngrok-generated address [run `ngrok http 39876`] or, in my case, `http://msgbot.webpropopuli.com:39876/sms`
The port can be whatever but A2Hosing wants it in the range 30000-50000.

### Upload

FTP code to my server. NPM seems to need a push with new packages (i.e. `npm i` doesn't work as advertised) so do a live test to see if anything needes to be installed seperately.

### Server side

SSH to my server and run `node server` in my directory
(Still need to figure out how to keep this always running.) Also, depending how you start this, the previous instance may not be dead so you may have to `kill` it yourself.

## ToDO items

1 Deploy to A2 on build, or push from GitHub
2 Add wildcard (e.g. '\*' or 'all' to DEL command)
3 Use the incoming number to allow a separate list for each caller.
