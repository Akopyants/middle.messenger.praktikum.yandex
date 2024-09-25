import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  const apiUrl = `https://jsonplaceholder.typicode.com`;
  const http = new HTTPTransport(`${apiUrl}`);

  it('GET', (done) => {
    http
      .get('posts')
      .then((result) => {
        console.log(result);
        done();
      })
      .catch((error) => {
        done(new Error(error));
      });
  });
});
