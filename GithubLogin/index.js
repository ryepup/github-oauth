const githubOathUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GithubOathClientId}&scope=gist`;

module.exports = function (context, req) {
  context.res = {
    status: 302,
    headers: { 'Location': githubOathUri }
  }
  context.done();
};
