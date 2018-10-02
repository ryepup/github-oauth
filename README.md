# Github oauth

This set of functions enables github authentication for frontend-only
applications, like those hosted using Github Pages.

How it works:

* frontend opens a new child window to `/api/GithubLogin`
* `/api/GithubLogin` redirects to github with the right keys
* user authenticates in the new window, github redirects to an azure function
* azure function posts back to github to get a auth token, renders a small snippet of javascript
* javascript uses [`postMessage`][1] to pass the token back to the original frontend

## Getting Started

See architecture decision records in `doc/adr`

There are a number of one-time setup steps involved.

### backend

* register your frontend with github by [creating an oauth app][2]
* create an azure functions application, v2 or above
* deploy to azure and get the URL to your `OauthCallback` function
* set the github "Authorization callback URL" to that URL
* adjust azure environment variable settings to fill in:
  * `GithubOauthClientId` - your application's client id from github
  * `GithubOauthClientSecret` - your application's client secret from github
  * `targetOrigin` - the origin where your frontend is hosted. This is used in
    the [postMessage][1] call to securely get the token back to your frontend
  * `GithubOauthScope` - what access your app needs. See [Understanding scopes
    for Oauth apps][3]

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[2]: https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/
[3]: https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/

### frontend

You need to something like this in your frontend, where-ever you have your users trying
to login:

```javascript
const githubLoginPopupUrl = 'https://YOUR-AZURE-FUNCTION-DOMAIN/api/GithubLogin'
const expectedOrigin = new URL(githubLoginPopupUrl).origin;

window.addEventListener('message', (event) => {
    if (event.origin === expectedOrigin && event.data.type === 'GITHUB_LOGIN_COMPLETE') {
        console.log('Oauth login complete. token:', event.data.payload.token);
        // do whatever you need to do with the token
    }
}, { capture: false, once: true })

window.open(githubLoginPopupUrl, 'Github authentication');
```
