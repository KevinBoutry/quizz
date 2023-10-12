import { ref } from 'vue';

const CreateAccountPanelStatus = ref(false);
const LoginPanelStatus = ref(false);
const isLogged = ref(false);
const endGamePanelStatus = ref(false);

const PreviewQuizz = ref({
  name: '',
  description: '',
  theme: '',
  time: 0,
  thumbnail: '',
  categories: [],
  textColor: '',
});

export function composable() {
  return {
    CreateAccountPanelStatus,
    LoginPanelStatus,
    isLogged,
    endGamePanelStatus,
    PreviewQuizz,
  };
}
