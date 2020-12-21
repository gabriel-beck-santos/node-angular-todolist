import { Router } from "express";
import authMiddleware from './security/authJwtValid'
import * as userController from './controllers/userController'
import * as authController from './controllers/authController'
import * as projectController from './controllers/projectController'
import * as taskController from './controllers/taskController'

const routes = Router();

routes.post('/signup',  userController.createUser);
routes.get('/login', authController.login);

routes.get('/projects', authMiddleware, projectController.getProjects);
routes.post('/projects', authMiddleware, projectController.createProject);
routes.put('/projects/:id', authMiddleware, projectController.updateProject);
routes.delete('/projects/:id', authMiddleware, projectController.deleteProject);

routes.get('/tasks/:id', authMiddleware, taskController.getTasksByProject);
routes.post('/tasks', authMiddleware, taskController.createTask);
routes.put('/tasks/:id', authMiddleware, taskController.updateTask);
routes.delete('/tasks/:id', authMiddleware, taskController.deleteTask); 

module.exports = routes;