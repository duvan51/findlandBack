import express from 'express';
import { registerUser, authUser, getAlluser, getUserByid, deleteUserById } from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     description: Registra un nuevo usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Autentica a un usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Error en la autenticación
 */
router.post('/login', authUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     description: Elimina un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', deleteUserById);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Obtiene la lista de todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', getAlluser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Obtiene un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', getUserByid);

export default router;