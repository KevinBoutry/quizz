import { ref } from 'vue';

const CreateAccountPanelStatus = ref(false);
const LoginPanelStatus = ref(false);
const isLogged = ref(false);

const PreviewQuizz = ref({
  name: '',
  description: '',
  theme: '',
  time: 0,
  thumbnail: '',
  categories: [],
});

export function composable() {
  return {
    CreateAccountPanelStatus,
    LoginPanelStatus,
    isLogged,
    PreviewQuizz,
  };
}
