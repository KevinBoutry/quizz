import { ref } from "vue";

const CreateAccountPanelStatus = ref(false);
const LoginPanelStatus = ref(false);
const isLogged = ref(false)

export function composable(){
    return{
        CreateAccountPanelStatus,
        LoginPanelStatus,
        isLogged
    }
}