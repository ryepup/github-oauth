# 4. Use environment variables for configuration

Date: 2018-07-14

## Status

Accepted

## Context

There are a handful of settings that need to match Github, and some of them are
not suitable for exposing to end-users. We also want to avoid checking these
secrets into git.

Options:

* copy/paste share-able config into the frontend and backend
* use environment variables to centralize config into the backend, only share
  URLs with the frontend
* use a data store (e.g. azure blob, cosmosdb, etc) to centralize config into
  the backend, only share URLs with the frontend.

## Decision

Use environment variables.

## Consequences

* requires more azure function configuration
* frontend integration requires less coordination
