# Github oath

This set of functions enables github authentication for frontend-only
applications.

How it works:

* frontend opens a new child window to https://github.com/login/oauth/authorize?
* user authenticates in the new window, github redirects to an azure function
* azure function posts back to github to get a auth token, renders a small snippet of javascript
* javascript uses `postMessage` to pass the token back to the original frontend