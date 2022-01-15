import { Router } from "express";
import {signup} from './signup';
const routes = Router();

routes.post('/newuser',signup);

export default routes;