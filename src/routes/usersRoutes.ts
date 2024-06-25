import express from 'express';
import { authorizeRouteAccess } from "@src/middleware/routes-authorization";
import { handleValidationErrors, validateEmail, validatePassword, validateRoleId } from "@src/validator/schemas";
import { allUsers, addUser, updateUser, deleteUser } from "@ctrls/usersCtrl";
import { Role } from "@type/auth";

export const usersRoutes = express.Router();

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
usersRoutes.get(
  '/all',
  authorizeRouteAccess([Role.SUPER_ADMIN]),
  allUsers
);

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.post(
  '/add',
  [validateEmail, validatePassword, validateRoleId],
  handleValidationErrors,
  authorizeRouteAccess([Role.ADMIN, Role.SUPER_ADMIN]),
  addUser
);

/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.patch(
  '/update/:id',
  [validateEmail, validatePassword, validateRoleId],
  handleValidationErrors,
  authorizeRouteAccess([Role.SUPER_ADMIN]),
  updateUser
);

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.delete(
  '/delete/:id',
  authorizeRouteAccess([Role.SUPER_ADMIN]),
  deleteUser
);
