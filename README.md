# Vulnerable React App - Security Testing

⚠️ **WARNING**: This application contains intentional security vulnerabilities for educational and testing purposes only. **DO NOT** deploy this to production or expose it to the internet.

## Purpose

This React application is designed to demonstrate common security vulnerabilities found in web applications. It can be used for:
- Learning about web security vulnerabilities
- Testing security scanning tools
- Security training and education
- Penetration testing practice

## Security Vulnerabilities Included

### 1. **Hardcoded Credentials** (CWE-798)
- Admin password hardcoded in source code
- API keys exposed in the application
- Database credentials in comments and code

### 2. **Cross-Site Scripting (XSS)** (CWE-79)
- Use of `dangerouslySetInnerHTML` without sanitization
- Direct rendering of user input
- Reflected XSS in search functionality
- Stored XSS in comments section

### 3. **Code Injection** (CWE-94)
- Use of `eval()` with user input
- `Function` constructor with unsanitized data
- Command injection simulation in admin panel

### 4. **Insecure Storage** (CWE-922)
- Sensitive data stored in localStorage (plain text)
- Passwords stored in browser storage
- Session tokens improperly stored

### 5. **Client-Side Authentication** (CWE-287)
- Authentication logic only on client-side
- No server-side validation
- Role-based access control only in frontend

### 6. **Information Disclosure** (CWE-200)
- Sensitive data in HTML comments
- API endpoints exposed in source code
- Debug information visible to users
- Sensitive data in DOM attributes
- Console logging of sensitive information

### 7. **SQL Injection** (CWE-89)
- Simulated SQL injection vulnerability in login form
- Unsafe query construction with user input

### 8. **Insecure Direct Object Reference (IDOR)** (CWE-639)
- Direct access to user data by ID
- No authorization checks for data access

### 9. **Open Redirect** (CWE-601)
- Unvalidated URL redirects
- User-controlled redirect parameters

### 10. **Missing Security Headers**
- No CSRF protection
- Improper CORS configuration
- Missing content security policies

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The app will run on `http://localhost:3000`

## Testing Vulnerabilities

### XSS Testing
1. In the User Profile bio field, try: `<img src=x onerror=alert('XSS')>`
2. In comments, try: `<script>alert(document.cookie)</script>`
3. In search, try: `<h1>Injected Header</h1>`

### Code Injection Testing
1. In comments, try: `console.log(document.cookie)`
2. In comments, try: `alert('Executed code')`

### Authentication Bypass
1. Open browser DevTools
2. Check localStorage for stored credentials
3. Modify the `role` value in localStorage to 'admin'

### Information Disclosure
1. View page source
2. Check HTML comments for sensitive data
3. Inspect DOM for hidden data attributes
4. Check browser console for leaked information

## Default Credentials

- **Username**: admin
- **Password**: admin123

## Educational Use Only

This application is created solely for educational purposes. The vulnerabilities are intentional and should help developers:
- Understand common security mistakes
- Learn how to identify vulnerabilities
- Practice secure coding techniques
- Test security tools and scanners

## What NOT to Do

- ❌ Do not deploy to production
- ❌ Do not expose to the internet
- ❌ Do not use these patterns in real applications
- ❌ Do not store real user data

## Secure Alternatives

For each vulnerability, here are the secure alternatives:

1. **Hardcoded Credentials**: Use environment variables and secret management services
2. **XSS**: Use proper escaping, Content Security Policy, and avoid `dangerouslySetInnerHTML`
3. **Code Injection**: Never use `eval()` or `Function()` constructor with user input
4. **Insecure Storage**: Use httpOnly cookies, encrypt sensitive data
5. **Client-Side Auth**: Always validate on the server-side
6. **Information Disclosure**: Remove debug info, use proper logging, sanitize errors
7. **SQL Injection**: Use parameterized queries and ORMs
8. **IDOR**: Implement proper authorization checks
9. **Open Redirect**: Validate and whitelist redirect URLs
10. **Security Headers**: Implement CSRF tokens, proper CORS, CSP headers

## License

MIT License - For educational purposes only

## Disclaimer

The creators of this application are not responsible for any misuse. This tool is meant for learning and testing in controlled environments only.
