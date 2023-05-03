import { ref } from "vue";

const CreateAccountPanelStatus = ref(false);

export function composable(){
    return{
        CreateAccountPanelStatus
    }
}