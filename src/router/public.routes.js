import express from "express";
import {
  loginEmployeeController,
  registerEmployeeController,
} from "../controller/employee.controller.js";

const publicRouter = new express.Router();

//employee public router
/**
 * @openapi
 * /api/employee/register:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Register new employee auto assign role as ADMIN
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 default: john doe
 *               email:
 *                 type: string
 *                 default: jd@pdu.com
 *               password:
 *                 type: string
 *                 default: Password123;
 *               confirmPassword:
 *                 type: string
 *                 default: Password123;
 *     responses:
 *       '201':
 *         description: Employee registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee registered
 *               data:
 *                 id: cu6s2qz4
 *                 name: John Doe
 *                 email: jd@mail.com
 *                 role: ADMIN
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request
 *       '500':
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
publicRouter.post("/api/employee/register", registerEmployeeController);

/**
 * @openapi
 * /api/employee/login:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Login employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: jd@pdu.com
 *               password:
 *                 type: string
 *                 default: Password123;
 *     responses:
 *       '200':
 *         description: Login success returing access token for 1 hour
 *         content:
 *           application/json:
 *             example:
 *               message: login success
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdTZzMnF6NCIsImlhdCI6MTYyNzY1MzQ0MiwiZXhwIjoxNjI3NjU3MDQyfQ.9Qv1oW4zQmYpVdZ3H3oKQk3FQ6XsLZJr6v7YQzY2s5I
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 *       '500':
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
publicRouter.post("/api/employee/login", loginEmployeeController);

export { publicRouter };
