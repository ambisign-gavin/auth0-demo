/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const SCRIPT = './dist/index.js';

const appName = 'auth_demo_server';

module.exports = {
  apps: [
    {
      name: `${appName}_prod`,
      script: SCRIPT,
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
