const githubOauthUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GithubOauthClientId}&scope=${process.env.GithubOauthScope}`;

module.exports = function (context, req) {
  context.res = {
    status: 302,
    headers: { 'Location': githubOauthUri }
  }
  context.done();
};
