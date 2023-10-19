import { HttpClient } from './HttpClient';
import { composable } from '@/state/composable';
import { ref } from 'vue';
import router from '@/router/index.ts';
import { user } from '@/state/user';

export class UserService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  public handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    const { username, password } = credentials;

    const success = ref(false);
    const error = ref('');
    const { errorMessage } = user();
    const { isLogged, LoginPanelStatus } = composable();

    const userCredentials = {
      username: username,
      password: password,
    };

    await this.http.instance
      .post('/auth/login', userCredentials)
      .then((res) => {
        success.value = true;
        if (res.access_token) {
          localStorage.setItem('user', JSON.stringify(res));
          isLogged.value = true;
        }
        LoginPanelStatus.value = false;
      })
      .catch((e) => {
        error.value = e.message;
        errorMessage.value = 'Invalid credentials';
      });
  };

  public handleSignup = async (credentials: {
    username: string;
    email: string;
    password: string;
    passwordbis: string;
  }) => {
    const { CreateAccountPanelStatus } = composable();
    const { username, email, password, passwordbis } = credentials;
    const { errorMessage } = user();

    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
    };

    const validatePassword = (password: string) => {
      return (
        String(password)
          /* TODO change password Regex penser à la changer aussi dans CreateAccount Password*/
          .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      );
    };

    if (username.length < 5) {
      return (errorMessage.value = 'Username must be at least 5 characters');
    }

    /* TODO VERIFIER si le username existe deja en BDD */

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Invalid email');
    }

    /* TODO VERIFIER si l'email existe deja en BDD */

    if (!validatePassword(password)) {
      return (errorMessage.value = 'You should use a stronger password');
    }

    if (password != passwordbis) {
      return (errorMessage.value = 'Please enter the same password');
    }

    errorMessage.value = '';

    const userCredentials = {
      username: username,
      email: email,
      password: password,
    };

    const success = ref(false);
    const error = ref('');

    await this.http.instance
      .post('/user/signup', userCredentials)
      .then((res) => {
        success.value = true;
        CreateAccountPanelStatus.value = false;
        this.handleLogin({
          username: userCredentials.username,
          password: userCredentials.password,
        });
      })
      .catch((e) => {
        error.value = e.message;
      });
  };

  getUser = async () => {
    const user = await this.http.instance.get('/auth/profile');
    return user;
  };
}
