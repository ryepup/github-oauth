const request = require('request-promise');

const defaultOptions = Object.freeze({
    method: 'POST',
    uri: 'https://github.com/login/oauth/access_token',
    json: true,
});

const defaultQueryOptions = Object.freeze({
    client_id: process.env.GithubOathClientId,
    client_secret: process.env.GithubOathClientSecret,
});

module.exports = function (context, req) {
    const { query: { code, state } } = req;

    const qs = { ...defaultQueryOptions, code, state };
    const opts = { ...defaultOptions, qs };
    context.log('calling github', opts)

    request(opts)
        .then(res => {
            const { access_token } = res;
            context.log('got response', res)
            context.res = {
                headers: { 'Content-Type': 'text/html' },
                body: `<html>Thank you!
                <script>
                  window.opener.postMessage({type: 'GITHUB_LOGIN_COMPLETE', payload:{token:'${access_token}'}}, '${process.env.targetOrigin}');
                  window.close();
                </script>
                </html>`
            };

            context.done();
        });
};