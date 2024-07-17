//MAIN FILE....for setting up swagger documentation and setup

import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc'; // used to build out the swaggerdocumentation
import swaggerUi from 'swagger-ui-express'; // used to expose the documentation in an Interface
import YAML from 'yamljs';
import { version } from '../../package.json'; //used to put our version on th docs

import log from './logger';
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'PJBOOKS REST API Docs',
      description: 'This is the SWAGGER API documentation of PJBooks app',
      version: version,
      contact: {
        name: 'uzo for more info @ +2348068393762',
        email: 'pjbooks@getMaxListeners.com',
      },
    },
    externalDocs: {
      description: 'Find out more about PJBooks',
      url: 'http://localhost:5000/login',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./docs/swaggerComponent.ts', './src/types/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
// log.info(swaggerSpec);

//function to expose some endpoints
function swaggerDocs(app: Express, port: number | string) {
  //swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
