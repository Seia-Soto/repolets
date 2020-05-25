const debug = require('debug')
const Koa = require('koa')

const pkg = require('./package')
const repositories = require('./repositories')

const app = new Koa()
const log = debug(pkg.name)

const port = process.env.port || 3000

module.exports = (async () => {
  app
    .use(async ctx => {
      const url = ctx.req.url || ''
      const args = url.split('/').slice(1)
      const repo = args.splice(0, 1)[0]

      log('repo: ' + repo)
      log('args: ' + args)

      let dest = 'https://github.com/Seia-Soto/repolets'

      if (repositories[repo]) {
        dest = repositories[repo] + args.join('/')
      }

      ctx.redirect(dest)
    })
    .listen(port, () => log('listening on port ' + port))
})()
