# Security Policy

## ⚠️ Important Notice

This application is **intentionally vulnerable** and designed for educational and security testing purposes only. It should **NEVER** be deployed to production or exposed to the internet.

## Dependency Security Status

### Last Security Scan

- **Scan Date**: 2025-10-16 (from automated security scan workflow)
- **Scanner**: Snyk + npm audit
- **Initial Vulnerabilities**: 6 (9 total including duplicates)
- **Fixed**: 4 vulnerabilities
- **Remaining**: 2 vulnerabilities (development-only)

### Fixed Vulnerabilities

The following vulnerabilities have been resolved using npm's `overrides` feature:

#### 1. nth-check - Regular Expression Denial of Service (ReDoS)
- **Package**: `nth-check@1.0.2`
- **CVE**: SNYK-JS-NTHCHECK-1586032
- **Severity**: HIGH
- **CVSS Score**: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P
- **Fixed Version**: 2.1.1
- **Status**: ✅ Fixed via npm overrides

#### 2. postcss - Improper Input Validation
- **Package**: `postcss@7.0.39`
- **CVE**: SNYK-JS-POSTCSS-5926692
- **Severity**: MEDIUM
- **CVSS Score**: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N
- **Fixed Version**: 8.4.31+
- **Status**: ✅ Fixed via npm overrides

#### 3. serialize-javascript - Cross-site Scripting (XSS)
- **Package**: `serialize-javascript@4.0.0`
- **CVE**: SNYK-JS-SERIALIZEJAVASCRIPT-6147607
- **Severity**: MEDIUM
- **CVSS Score**: CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N/E:P
- **Fixed Version**: 6.0.2
- **Status**: ✅ Fixed via npm overrides

#### 4. inflight - Missing Release of Resource after Effective Lifetime
- **Package**: `inflight@1.0.6`
- **CVE**: SNYK-JS-INFLIGHT-6095116
- **Severity**: MEDIUM
- **CVSS Score**: CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P
- **Status**: ✅ Resolved (no longer in dependency tree after applying overrides)
- **Note**: This library is unmaintained and being phased out of the ecosystem

### Remaining Vulnerabilities (Development Only)

The following vulnerabilities remain but have **LIMITED IMPACT** as they only affect the development server:

#### 5. webpack-dev-server - Origin Validation Error
- **Package**: `webpack-dev-server@4.15.2`
- **CVE**: SNYK-JS-WEBPACKDEVSERVER-10300775
- **Severity**: MEDIUM (originally reported as HIGH)
- **CVSS Score**: CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N/E:P
- **Fixed Version**: 5.2.1+
- **Status**: ⚠️ Cannot fix without breaking changes
- **Impact**: Development only - not present in production builds
- **Attack Vector**: User must access malicious website while dev server is running in non-Chromium browser
- **Mitigation**:
  - Only affects development environment
  - Chrome 94+ users are unaffected
  - Don't browse untrusted sites while dev server is running
  - Use `npm run build` for production (dev server not included)

#### 6. webpack-dev-server - Exposed Dangerous Method or Function
- **Package**: `webpack-dev-server@4.15.2`
- **CVE**: SNYK-JS-WEBPACKDEVSERVER-10300777
- **Severity**: MEDIUM
- **CVSS Score**: CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N/E:P
- **Fixed Version**: 5.2.1+
- **Status**: ⚠️ Cannot fix without breaking changes
- **Impact**: Development only - not present in production builds
- **Attack Vector**: Attacker must know specific port and output entrypoint script path
- **Mitigation**: Same as above

### Why webpack-dev-server Cannot Be Upgraded

1. **Compatibility Issue**: react-scripts@5.0.1 requires webpack-dev-server@4.x
2. **No v4.x Patch**: Security fixes are only available in webpack-dev-server@5.2.1+
3. **Breaking Changes**: Upgrading to v5.x breaks react-scripts due to API changes
4. **Development Only**: webpack-dev-server is not included in production builds
5. **Limited Risk**: Vulnerabilities require specific attack scenarios

## Production Security

### Production Builds Are Secure

When you run `npm run build`, the production bundle:
- ✅ Does NOT include webpack-dev-server
- ✅ Does NOT include any development dependencies
- ✅ Contains only the application code and runtime dependencies
- ✅ Is free from the webpack-dev-server vulnerabilities

### Verifying Production Build Security

1. Build the application:
   ```bash
   npm run build
   ```

2. The `build/` folder contains only:
   - Optimized JavaScript bundles
   - CSS files
   - Static assets
   - No development tools or servers

## Best Practices for Development

### Running the Development Server Safely

1. **Trusted Network**: Only run dev server on trusted networks
2. **Browser Choice**: Use Chromium-based browsers (Chrome, Edge) when possible
3. **Avoid Browsing**: Don't browse untrusted websites while dev server is running
4. **Localhost Only**: Dev server binds to localhost by default
5. **Firewall**: Ensure dev server port (3000) is not exposed to internet

### Security Checklist

- [ ] Never deploy development build to production
- [ ] Always use `npm run build` for production deployments
- [ ] Run dev server only in trusted environments
- [ ] Keep dependencies updated (run `npm audit` regularly)
- [ ] Use Chromium-based browsers for development

## Vulnerability Reporting

Since this is an intentionally vulnerable application for educational purposes, we welcome reports of:
- NEW security issues not already documented
- Issues in the security documentation
- Suggestions for improving security education content

**Not needed**:
- Reports of intentional vulnerabilities (see README.md)
- Reports of the 2 remaining webpack-dev-server issues (already documented)

## Version Support

| Version | Supported          | Notes                           |
| ------- | ------------------ | ------------------------------- |
| 0.1.0   | :white_check_mark: | Current version, security fixes applied |
| < 0.1.0 | :x:                | Legacy versions, not maintained |

## Verification Commands

### Check Current Security Status
```bash
npm audit
```

### View Overridden Packages
```bash
npm list nth-check postcss serialize-javascript webpack-dev-server
```

### Verify Production Build
```bash
npm run build
ls -la build/
```

## References

- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [npm overrides documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides)
- [Snyk vulnerability database](https://security.snyk.io/)
- [Create React App security best practices](https://create-react-app.dev/docs/production-build/)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE - Common Weakness Enumeration](https://cwe.mitre.org/)
- [Snyk Learn - Security Education](https://learn.snyk.io/)

---

**Last Updated**: 2025-10-16  
**Maintained By**: Security Team
