/**
 * @openapi
 * /api/quest:
 *   post:
 *     summary: Create a quest
 *     tags:
 *       - Quest
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Find the treasure
 *               description:
 *                 type: string
 *                 example: This is an epic adventure to find the treasure.
 *     responses:
 *       201:
 *         description: Quest successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Find the treasure
 *                 description:
 *                   type: string
 *                   example: This is an epic adventure to find the treasure.
 *                 user_id:
 *                   type: number
 *                   example: 42
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Title must not be empty
 *                 error:
 *                   type: string
 *                   example: Bad Request
 */
