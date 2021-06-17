import { createServer, Response } from 'miragejs';

export default () => {
  createServer({
    routes() {
      // this.namespace = '/api';

      this.patch('/user/register', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        console.log(body);
        return new Response(
          200,
          { some: 'header' },
          { message: 'Hello, zjuer', exists: true },
        );
      });

      this.get('/user', (schema, request) => {
        const { email } = request.queryParams;
        if (email.endsWith('zju.edu.cn')) {
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
            message: 'Use your student id to login',
            exists: false,
          },
        );
      });

      this.post('/user/login', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        console.log(body);
        // debugger;
        if (
          body.email.endsWith('zju.edu.cn') &&
          body.password === body.email.split('@')[0]
        ) {
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
