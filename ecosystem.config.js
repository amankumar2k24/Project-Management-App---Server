// module.exports = {
//   apps: [
//     {
//       name: "project-management",
//       script: "npm",
//       args: "run dev",
//       env: {
//         NODE_ENV: "development",
//       },
//     },
//   ],
// };

module.exports = {
  apps: [
    {
      name: "project-management",
      script: "./src/index.js",        // Point to your app entry file
      instances: "max",             // Run in cluster mode using all available CPUs
      exec_mode: "cluster",         // Enables clustering
      autorestart: true,            // Restart app on crash
      watch: false,                 // Disable watch in production
      max_memory_restart: "500M",   // Auto-restart if memory usage exceeds 500 MB
      env: {
        NODE_ENV: "production",     // Set production environment
      },
    },
  ],
};
