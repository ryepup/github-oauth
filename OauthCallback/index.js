module.exports = function (context, req) {
    const { query: { code, state } } = req;

    context.log('JavaScript HTTP trigger function processed a request.');

    // TODO: call github to get a token

    context.res = {
        headers: { 'Content-Type': 'text/html' },
        body: `<html>Hello ${code}, ${state}. TODO: render postMessage code</html>`
    };

    context.done();
};