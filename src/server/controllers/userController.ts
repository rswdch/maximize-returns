import { Request, Response, NextFunction } from 'express';

const userController: Record<string, any> = {};

userController.getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from userController!');
  next();
}

export { userController };