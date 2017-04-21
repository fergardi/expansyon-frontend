const constants = {
  dev: {
    api: '//localhost:34567/api',
    socket: '//localhost:34567',
    tiles: '//localhost:34567/tiles'
  },
  production: {
    api: 'https://expansyon.com/api',
    socket: 'https://expansyon.com',
    tiles: 'https://expansyon.com/tiles'
  }
}

// env
var env = process.env.NODE_ENV || 'dev'

export default constants[env]
