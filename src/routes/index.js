import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => response.send('routes running!'));

export default routes;
