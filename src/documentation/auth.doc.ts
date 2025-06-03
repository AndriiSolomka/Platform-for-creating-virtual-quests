/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and authorization for users
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login with local authentication
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Successful login, sets a cookie with the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *       401:
 *         description: Invalid username or password
 */

/**
 * @swagger
 * /auth/confirm:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Confirm email by token
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Confirmation token sent to email
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email confirmed successfully
 *       400:
 *         description: Invalid or expired token
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Redirect to Google OAuth for authentication (cannot be tested via Swagger UI)
 *     description: >
 *       This endpoint returns a 302 redirect to the Google authentication page.
 *       It cannot be fully tested via Swagger UI due to CORS and redirect limitations.
 *       To authenticate via Google, use a direct browser request to /auth/google.
 *     responses:
 *       302:
 *         description: Redirect to Google authentication page
 *         headers:
 *           Location:
 *             description: URL for redirect to Google
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Callback after Google OAuth authentication
 *     description: >
 *       Handles the response from Google after successful authentication.
 *       Sets a cookie with the access token.
 *     responses:
 *       200:
 *         description: Successfully logged in with Google
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in with Google successfully
 *       400:
 *         description: Authentication error
 */
