Archery Scorer
==============

A simple web-application leveraging [Firebase](https://www.firebase.com/) to store your archery scores. This started [because I couldn't get my mental arithmetic up to speed to calculate my score for a round of six arrows shot](http://drmsite.blogspot.co.uk/2014/08/archery-scorer-mental-arithmetic-isnt.html)... rather than work on my maths skills I decided to cheat ;-).

Simply host this [within a publicly shared folder in your Google Drive](https://support.google.com/drive/answer/2881970?hl=en) and sign up for a [Firebase](https://www.firebase.com/) account... then replace the three `<your-firebase>` references (two in index.html and one in show.html) with whatever the name of your firebase is. Remember the location of your page and you're away... at least you are when you've enabled **Enable Email & Password Authentication** and created a user.

If you create more than one account then the show.html is smart enough to get the correct scores for the user. Firebase rocks!

TODO
----
1. ~~Implement simple security.~~
2. Separate scores by day (probably have to do something with the structure of the DB for this to work).
3. ~~Perhaps make it work for multiple people/profiles.~~
4. Improve filtering so multiple sessions a day can be displayed.
5. Some fancy visualizations for improvements etc.
6. ~~Implement Rules Security.~~
7. Add ability to remove specific score rows from the table.

Demo hosted on [Firebase](https://incandescent-fire-8185.firebaseapp.com/).

UPDATE
------

This rule seems to secure each users data from hacking:

    {
        "rules": {
            "scores": {
                "$uid": {
                    ".read": "auth != null && auth.uid == $uid",
                    ".write": "auth != null && auth.uid == $uid"
                }
            }
        }
    }

If you're hosting on Firebase though you can add these rules as a separate json file and include it in the rules section of your `firebase.json` file.