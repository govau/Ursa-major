#!/bin/bash

if [ "$CIRCLE_BRANCH" = "master" ]
then
    export GATSBY_API_URL="https://analytics.service.gov.au/api"
    export GATSBY_API_CREDS="$API_KEY_PROD"
else
    export GATSBY_API_URL="https://ursa-major-front-end.apps.y.cld.gov.au/api"
    export GATSBY_API_CREDS="$API_KEY_DEV"
fi