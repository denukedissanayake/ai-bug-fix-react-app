#!/usr/bin/env node

/**
 * This script patches the webpack-dev-server configuration in react-scripts
 * to be compatible with webpack-dev-server v5.x
 * 
 * The migration changes:
 * - onBeforeSetupMiddleware + onAfterSetupMiddleware -> setupMiddlewares
 * - https option -> server.type and server.options
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-scripts',
  'config',
  'webpackDevServer.config.js'
);

if (!fs.existsSync(configPath)) {
  console.warn('webpack-dev-server config file not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(configPath, 'utf8');

// Check if already patched
if (content.includes('setupMiddlewares') && content.includes('server:')) {
  console.log('webpack-dev-server config already patched');
  process.exit(0);
}

// Step 1: Replace the middleware API
const middlewarePattern = /onBeforeSetupMiddleware\(devServer\) \{[\s\S]*?\},\s*onAfterSetupMiddleware\(devServer\) \{[\s\S]*?\},/;

const newMiddlewareCode = `setupMiddlewares(middlewares, devServer) {
      // Keep evalSourceMapMiddleware middlewares before redirectServedPath
      // otherwise will not have any effect. This lets us fetch source contents
      // from webpack for the error overlay
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(devServer.app);
      }

      // Redirect to PUBLIC_URL or homepage from package.json if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));

      return middlewares;
    },`;

// Step 2: Replace the https option with server option
const httpsPattern = /https: getHttpsConfig\(\),/;
const newHttpsCode = `server: getHttpsConfig() ? {
      type: 'https',
      options: getHttpsConfig(),
    } : 'http',`;

if (middlewarePattern.test(content)) {
  content = content.replace(middlewarePattern, newMiddlewareCode);
  console.log('✅ Middleware API patched successfully');
} else {
  console.error('❌ Failed to find middleware pattern to patch');
  process.exit(1);
}

if (httpsPattern.test(content)) {
  content = content.replace(httpsPattern, newHttpsCode);
  console.log('✅ HTTPS configuration patched successfully');
} else {
  console.error('❌ Failed to find https pattern to patch');
  process.exit(1);
}

fs.writeFileSync(configPath, content, 'utf8');
console.log('✅ webpack-dev-server config fully patched for v5 compatibility');
