module.exports = {
  apps: [
    {
      name: "yourNameApp",
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 50,
      watch: false,
      env: {
        NODE_APP_ENCODER: "mysecretjwt",
        SECRET_SALT: 12,

        NODE_DB_HOST: "127.0.0.1",
        NODE_DB_USER: "YOUR_USER",
        NODE_DB_PASS: "YOUR_PASS",
        NODE_DB_PORT: "3307",
        NODE_DB_DATABASE: "MY_DATABASE",
        NODE_PORT: 3000
      },
      script: "index.js",
      cwd: "./dist/src/"
    }
  ],
};
