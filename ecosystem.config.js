module.exports = {
  apps: [
    {
      name: 'auth-demo-prod',
      script: 'npm start -- -p 3020',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
}
