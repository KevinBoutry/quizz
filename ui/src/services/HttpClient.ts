import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

function authHeader() {
  const userLS = localStorage.getItem('user');
  // TODO améliorer gestion erreur
  if (userLS) {
    const user = JSON.parse(userLS);
    if (user && user.access_token) {
      return 'Bearer ' + user.access_token;
    } else {
      return '';
    }
  }
}

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export class HttpClient {
  public readonly instance: AxiosInstance;

  public constructor() {
    const baseURL = 'http://localhost:3000';
    this.instance = axios.create({
      baseURL,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers['Authorization'] = authHeader();
      return config;
    });
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}
