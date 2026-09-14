const { defineConfig } = require('cypress')
const { execFile } = require('child_process')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      on('task', {
        cloneViaSSH({ repository, destination }) {
          return new Promise((resolve, reject) => {
            execFile('git', ['clone', repository, destination], {
              cwd: config.projectRoot,
              env: {
                ...process.env,
                GIT_SSH_COMMAND: 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL',
              },
            }, (error, stdout, stderr) => {
              if (error) {
                reject(new Error(stderr || stdout || error.message))
                return
              }

              resolve(null)
            })
          })
        },
      })

      return config
    },
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})
