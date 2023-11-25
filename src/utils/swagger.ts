import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc'; // used to build out swaggerdocumentation
import swaggerUi from 'swagger-ui-express'; // used to expose the documentation in an Interface
import { version } from '../../package.json';
import log from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PJBOOKS REST API Docs',
      description: 'This is the SWAGGER API documentation of PJBooks app',
      version,
      contact: {
        name: 'uzo for more info',
        email: 'pjbooks@getMaxListeners.com',
      },
    },
    externalDocs: {
      description: 'Find out more about PJBooks',
      url: 'http://localhost:5000/login',
    },

    components: {
      securitySchemas: {
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
  apis: ['./src/routes/userRoutes.ts', './src/types/*.ts'], //
};

const swaggerSpec = swaggerJsdoc(options);
log.info(swaggerSpec);

function swaggerDocs(app: Express, port: number | string) {
  //swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get('./docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
