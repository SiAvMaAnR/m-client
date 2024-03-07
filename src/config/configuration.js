const config = {
  app: {
    port: process.env.PORT
  },
  server: {
    url: process.env.REACT_APP_SERVER_URL,
    timeout: process.env.REACT_APP_SERVER_TIMEOUT
  }
}

export default config
