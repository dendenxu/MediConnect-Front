import { createServer, Response } from 'miragejs';

export default () => {
  createServer({
    routes() {
      this.post('/email', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        console.log(body);
        // debugger;
        if (body.email.endsWith('zju.edu.cn')) {
          return new Response(
            200,
            { some: 'header' },
            { message: 'Hello, zjuer', exists: true },
          );
        }
        return new Response(
          404,
          { some: 'header' },
          {
            message: 'Only zju.edu.cn emails are allowed to login',
            exists: false,
          },
        );
      });
    },
  });
};

// Setting up a small mock server
