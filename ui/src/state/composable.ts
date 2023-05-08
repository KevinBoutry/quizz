import { ref } from "vue";

const CreateAccountPanelStatus = ref(false);
const LoginPanelStatus = ref(false);

export function composable(){
    return{
        CreateAccountPanelStatus,
        LoginPanelStatus
    }
}