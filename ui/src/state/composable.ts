import { ref } from 'vue';

const CreateAccountPanelStatus = ref(false);
const LoginPanelStatus = ref(false);
const isLogged = ref(false);
const endGamePanelStatus = ref(false);

const PreviewQuizz = ref({
  name: '',
  description: '',
  theme: '',
  type: '',
  time: 0,
  thumbnail: '',
  categories: [],
  textColor: 'FFFFFF',
  backgroundColor: '000000',
  showTitle: true,
  public: true,
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
