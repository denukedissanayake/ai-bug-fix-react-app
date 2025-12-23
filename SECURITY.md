# Security Policy

## Resolved Vulnerabilities

The following security vulnerabilities have been addressed using npm package overrides in `package.json`:

### Fixed via Overrides

1. **nth-check** - Upgraded from 1.0.2 to 2.1.1
   - CVE: SNYK-JS-NTHCHECK-1586032
   - Severity: MEDIUM/HIGH
   - Issue: Regular Expression Denial of Service (ReDoS)
   - Fix: Override to version `^2.0.1`

2. **postcss** - Upgraded from 7.0.39 to 8.4.31+
   - CVE: SNYK-JS-POSTCSS-5926692
   - Severity: MEDIUM
   - Issue: Improper Input Validation
   - Fix: Override to version `^8.4.31` (resolves to 8.5.6)

3. **serialize-javascript** - Upgraded from 4.0.0 to 6.0.2
   - CVE: SNYK-JS-SERIALIZEJAVASCRIPT-6147607
   - Severity: MEDIUM
   - Issue: Cross-site Scripting (XSS)
   - Fix: Override to version `^6.0.2`

4. **webpack-dev-server** - Upgraded from 4.15.2 to 5.2.1+
   - CVE: SNYK-JS-WEBPACKDEVSERVER-10300775, SNYK-JS-WEBPACKDEVSERVER-10300777
   - Severity: HIGH, MEDIUM
   - Issue: Origin Validation Error and Exposed Dangerous Method
   - Fix: Override to version `^5.2.1` (resolves to 5.2.2)

## Known Unresolved Vulnerabilities

### inflight@1.0.6

**Status**: No fix available
**Severity**: MEDIUM
**CVE**: SNYK-JS-INFLIGHT-6095116
**CVSS Score**: CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P

**Description**: Missing Release of Resource after Effective Lifetime - memory leak vulnerability

**Dependency Path**: 
```
vulnerable-react-app → react-scripts@5.0.1 → react-dev-utils@12.0.1 
→ fork-ts-checker-webpack-plugin@6.5.3 → glob@7.2.3 → inflight@1.0.6
```

**Mitigation**: 
- This library is deprecated and not maintained
- The vulnerability requires local access (Attack Vector: Local) to exploit
- It's used only in development dependencies (react-scripts)
- The risk is low for production deployments as react-scripts is a development-only dependency
- Monitoring for updates to upstream dependencies (react-scripts, fork-ts-checker-webpack-plugin) that may remove this dependency

**Recommendation**: 
This is a transitive dependency of `react-scripts@5.0.1`. Until the upstream packages remove or replace this dependency, or Create React App releases an update, this vulnerability cannot be directly fixed without ejecting from Create React App, which would introduce significant maintenance burden.

## Verification

To verify the current security status:
```bash
npm audit
```

Expected output: Reports only the inflight vulnerability (if any), all other vulnerabilities should be resolved.

## Last Updated

2025-10-17
