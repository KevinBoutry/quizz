import { ref } from 'vue';

const errorMessage = ref();
const userProfile = ref({ username: '', userid: '', email: '' });

export function user() {
  return {
    errorMessage,
    userProfile,
  };
}
