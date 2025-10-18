# Security Vulnerability Fixes - 2025-10-18

## Summary
This document describes the fixes applied to resolve 6 security vulnerabilities detected in the security scan on 2025-10-18.

## Vulnerabilities Fixed

### 1. Inflight@1.0.6 - Missing Release of Resource (MEDIUM)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-INFLIGHT-6095116
- **Solution**: Upgraded `glob` package from 7.x to 10.4.5 which no longer uses inflight
- **Dependency Path**: react-scripts → ... → glob → inflight
- **Fix Method**: npm overrides in package.json

### 2. nth-check@1.0.2 - Regular Expression Denial of Service (MEDIUM)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-NTHCHECK-1586032
- **Solution**: Upgraded from 1.0.2 to 2.1.1
- **Dependency Path**: react-scripts → @svgr/webpack → @svgr/plugin-svgo → svgo → css-select → nth-check
- **Fix Method**: npm overrides in package.json

### 3. postcss@7.0.39 - Improper Input Validation (MEDIUM)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-POSTCSS-5926692
- **Solution**: Upgraded from 7.0.39 to 8.4.31+
- **Dependency Path**: react-scripts → resolve-url-loader → postcss
- **Fix Method**: npm overrides in package.json

### 4. serialize-javascript@4.0.0 - Cross-site Scripting (MEDIUM)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-SERIALIZEJAVASCRIPT-6147607
- **Solution**: Upgraded from 4.0.0 to 6.0.2
- **Dependency Path**: react-scripts → workbox-webpack-plugin → workbox-build → rollup-plugin-terser → serialize-javascript
- **Fix Method**: npm overrides in package.json

### 5. webpack-dev-server@4.15.2 - Origin Validation Error (HIGH)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-WEBPACKDEVSERVER-10300775
- **Solution**: Upgraded from 4.15.2 to 5.2.2
- **Dependency Path**: react-scripts → webpack-dev-server
- **Fix Method**: npm overrides + patch-package for API compatibility

### 6. webpack-dev-server@4.15.2 - Exposed Dangerous Method (MEDIUM)
- **Status**: ✅ Fixed
- **CVE ID**: SNYK-JS-WEBPACKDEVSERVER-10300777
- **Solution**: Upgraded from 4.15.2 to 5.2.2
- **Dependency Path**: react-scripts → webpack-dev-server
- **Fix Method**: npm overrides + patch-package for API compatibility

## Implementation Details

### Package.json Changes

1. **Added npm overrides** to force specific package versions:
   ```json
   "overrides": {
     "nth-check": "^2.1.1",
     "postcss": "^8.4.31",
     "serialize-javascript": "^6.0.2",
     "webpack-dev-server": "^5.2.1",
     "glob": "^10.3.10"
   }
   ```

2. **Added devDependencies** for patching:
   ```json
   "devDependencies": {
     "patch-package": "^8.0.1",
     "postinstall-postinstall": "^2.1.0"
   }
   ```

3. **Added postinstall script** to apply patches:
   ```json
   "scripts": {
     "postinstall": "patch-package"
   }
   ```

### webpack-dev-server v5 Compatibility Patch

Since webpack-dev-server upgraded from v4 to v5 introduced breaking API changes, we created a patch for react-scripts@5.0.1 to maintain compatibility:

**Changes in `patches/react-scripts+5.0.1.patch`:**

1. **Replaced deprecated `onBeforeSetupMiddleware` and `onAfterSetupMiddleware`** with the new `setupMiddlewares` API
2. **Updated `https` configuration** to use the new `server` option format:
   - `https: true` → `server: 'https'`
   - `https: false` → `server: 'http'`
   - `https: { cert, key }` → `server: { type: 'https', options: { cert, key } }`

## Verification

### npm audit Results
```
found 0 vulnerabilities
```

### Build Status
- ✅ Production build: Successful
- ✅ Development server: Successful
- ⚠️ Pre-existing linting warnings (unrelated to security fixes)

### Upgraded Package Versions
- inflight: Removed (glob upgraded to v10 doesn't use it)
- nth-check: 1.0.2 → 2.1.1
- postcss: 7.0.39 → 8.5.6
- serialize-javascript: 4.0.0 → 6.0.2
- webpack-dev-server: 4.15.2 → 5.2.2
- glob: 7.2.3 → 10.4.5

## Testing
- Production builds tested and working correctly
- Development server tested and working correctly
- All security vulnerabilities resolved per npm audit

## Notes
- The webpack-dev-server vulnerabilities only affect development environments
- Production builds do not include webpack-dev-server
- The patch is automatically applied during `npm install` via the postinstall script
- If you need to modify the patch, edit the file in `node_modules/react-scripts/config/webpackDevServer.config.js` and run `npx patch-package react-scripts`
