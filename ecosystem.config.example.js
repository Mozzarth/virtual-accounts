module.exports = {
  apps: [
    {
      name: "yourNameApp",
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 50,
      watch: false,
      env: {
        NODE_ENV: "yourEnv",
        NODE_HOST: 'localhost',
        NODE_PORT: 3010,
      },
      script: "index.js",
      cwd: "./dist/"
    }
  ],
};
