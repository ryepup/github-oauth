# 3. Use Azure functions for the backend

Date: 2018-07-14

## Status

Accepted

## Context

We need a minimal backend to implement to the oauth ["authorization code"][1] flow.

## Decision

Use [Azure functions][2] to implement the two HTTP endpoints needed.

## Consequences

* tightly coupled to microsoft's platform
* less development needed
* deployment costs money

[1]: https://tools.ietf.org/html/rfc6749#section-4.1
[2]: https://azure.microsoft.com/en-us/services/functions/
