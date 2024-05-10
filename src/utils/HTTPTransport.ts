import router from '../router';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface Options {
  data?: { [key: string]: string | unknown };
  timeout?: number;
  method?: METHODS;
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

class HTTPTransport {
  constructor(private apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}/${url}`, { ...options, method: METHODS.GET }, options?.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}/${url}`, { ...options, method: METHODS.PUT }, options?.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}/${url}`, { ...options, method: METHODS.POST }, options?.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}/${url}`, { ...options, method: METHODS.DELETE }, options?.timeout);

  request(url: string, options: Options = {}, timeout = 1000): Promise<XMLHttpRequest> {
    const { data, method } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('Нет метода');
        return;
      }
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = timeout;

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          try {
            const response = JSON.parse(xhr.responseText);
            const reason = response.reason || '';

            if (reason === 'User already in system') {
              router.go('/messenger');
              return;
            }
            reject(xhr);
          } catch (error) {
            console.log(error);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data?.file instanceof FormData) {
        if (data.file) {
          xhr.send(data.file);
          return;
        }
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
