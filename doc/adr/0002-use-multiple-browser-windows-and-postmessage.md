# 2. Use multiple browser windows and `postMessage`

Date: 2018-07-14

## Status

Accepted

## Context

I have a single-page application hosted on Github Pages, and want to
authenticate with github.

Oauth has a number of ["grant types"][4] for how to accomplish authentication and
authorization, including a ["implicit"][2] grant type intended for single-page apps,
but github only supports the ["authorization code"][3] grant type.

This requires a backend for github to call, and is incompatible with Github Pages.

## Decision

We'll use new browser windows and [`postMessage`][1] to pass data across domains
to a minimal backend that handles the oauth ["authorization code"][3]
requirements.

## Consequences

* special care needs to be taken around [`postMessage`][1] to ensure oauth
  tokens are not accessible to other domains
* popup blockers will get in the way, users will need to allow the popup

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[2]: https://tools.ietf.org/html/rfc6749#section-4.2
[3]: https://tools.ietf.org/html/rfc6749#section-4.1
[4]: https://aaronparecki.com/oauth-2-simplified/
