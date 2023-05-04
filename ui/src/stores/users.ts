import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios';

export const useUserStore = defineStore('users', () => {
    const user = ref(null);
    const errorMessage = ref("")

    const validateEmail = (email : string) =>  {
        return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    }

    const validatePassword = (password: string) => {
        return String(password)
        /* TODO change password Regex penser à la changer aussi dans CreateAccount Password*/
        .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    }

    const handleLogin = ()=>{}

    const handleSignup = (credentials: {username: string, email:string, password:string, passwordbis:string}) => {
        const { username, email, password, passwordbis } = credentials;

        if(username.length < 5){
            return errorMessage.value = "Username must be at least 5 characters"
        }

        /* TODO VERIFIER si le username existe deja en BDD */

        if(!validateEmail(email)){
            return errorMessage.value = "Invalid email"
        }

        /* TODO VERIFIER si l'email existe deja en BDD */

        if(!validatePassword(password)){
            return errorMessage.value = "You should use a stronger password"
        }

        if(password != passwordbis){
            return errorMessage.value = "Please enter the same password"
        }

        errorMessage.value=""

        const user = {
            'username': username,
            'email': email,
            'password': password,
        }

        const success = ref(false);
        const error = ref('');
        
        axios.post('http://localhost:3000/user/signup', user)
        .then((res)=>{
            console.log(res.data);
            success.value = true            
        })
        .catch((error=>{
            error.value = error.data.message
        }))        
    }

    const handleLogout = ()=>{}

    const getUser = ()=>{}

    return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser}
})