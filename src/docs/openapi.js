import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    failOnErrors: true,
    openapi: "3.0.0",
    info: {
      title: "PDU API Documentation",
      description: "PDU Backend API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "http://27.112.79.127",
        description: "Production server",
      },
    ],
    security: [
      {
        JWTAuth: [],
      },
      {
        sensorKeyAuth: [],
      },
      {
        mlKeyAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        JWTAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        sensorKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-well-secret-token",
        },
        mlKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-ml-secret-token",
        },
      },
    },
  },
  apis: ["./src/router/*.routes.js"],
};

export const docs = swaggerJSDoc(options);
