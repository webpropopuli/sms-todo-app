#An SMS-based Todo List and Resume Server, David Marlowe

## Description

Using a self-hosted Express server and the Twilio messaging API, this is an SMS (text) ToDo list. By sending a text, users can ADD and DEL items and LIST all items. Unknown/ambiguous text will return the app instructions and the caller can also request my resume by texting RES.
This also handles multiple users (based on inc phone number)

## Setup and Deploy

The app lives at 401-324-0900

### Twilio:

You'll need a Twilio account and phone number. I'd suggest starting with the very cool [Twilio Quest](https://www.twilio.com/quest) as they will give you a $20 credit after a few lessons plus you'll learn the basics of Twilio.  ($20 will last a long time if you're just doing messaging) Each time you change your server location, you have to tell Twilio about the change. Select your phone number, then under 'Messaging' and 'A message comes in', set it to 'Webhook' and your server's path and port ~and the trailing `/sms` - the path you are controlling in Express. Either use the ngrok-generated address [run `ngrok http 39876`] or, in my case, `http://msgbot.webpropopuli.com:39876/sms`. The port can be whatever but my host wants it in the range 30000-50000. The downside of ngrok is that, without a paid account, you have to change the Twilio dashboard server path each time you restart ngrok. I used my personal hosting account at A2 but this is the same process for Heroku, Netlify, etc.
Most of the live server notes below address my hosting method; refer to your host's docs when you get stuck.

### Upload

I just FTP code to my server. NPM seems to need a push with new packages (i.e. `npm i` doesn't work as advertised) so do a live test to see if anything needs to be installed separately.

### Server side

SSH to my server and run `nohup node server &` in my directory. `nohup` allows it to run after the SSH session closes (nohup = "no hangup" - old-school stuff there) and the trailing `&` runs it in background. Also, everything that would have written to the screen is now redirected to `nohup.out` (renameable). If you just type `node server` the server dies when you close your shell terminal. Also, the next time you restart your SSH session, the previous instance may not be dead so you may have to `kill` it yourself.

## ToDO items

1 Deploy to A2 on build, or push from GitHub
2 Add wildcard (e.g. '\*' or 'all' to DEL command)
4 Convert flat array to database
