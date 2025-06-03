/**
 * @openapi
 * /api/question:
 *   post:
 *     summary: Create a question
 *     tags:
 *       - Question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - quest_id
 *               - type
 *               - content
 *             properties:
 *               quest_id:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 enum: [OPEN, MULTIPLE_CHOICE, IMAGE_SEARCH]
 *                 example: MULTIPLE_CHOICE
 *               content:
 *                 type: string
 *                 example: What is NestJS?
 *               options:
 *                 type: array
 *                 description: Array of option objects
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: Framework
 *                     isCorrect:
 *                       type: boolean
 *                       example: true
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Question successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 42
 *                 quest_id:
 *                   type: integer
 *                   example: 1
 *                 type:
 *                   type: string
 *                   example: MULTIPLE_CHOICE
 *                 content:
 *                   type: string
 *                   example: What is NestJS?
 *                 options:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         example: Framework
 *                       isCorrect:
 *                         type: boolean
 *                         example: true
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                   example: https://example.com/uploads/questions/nest.png
 *       400:
 *         description: Validation error or invalid options format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["type must be one of the following values: OPEN, MULTIPLE_CHOICE, IMAGE_SEARCH"]
 *                 error:
 *                   type: string
 *                   example: Bad Request
 */
