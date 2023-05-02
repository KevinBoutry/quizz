<template>
    <div class="container">
        <form name="create-account" @submit="onSubmit">
            <h2>Create Account</h2>
            <div>
                <p>Username :</p>
                <input type="text">
            </div>
            <div>
                <p>Email :</p>
                <input type="email">
            </div>
            <div>
                <p>Password :</p>
                <input v-model="password" >
                <span>{{ errorMessage }}</span>
            </div>
            <div>
                <p>Confirm password :</p>
                <input type="text">
            </div>
            <button>VALIDATE</button>
        </form>
    </div>
</template>

<script lang="ts" setup>

import {useField} from 'vee-validate'

const {password, errorMessage} = useField('fullName', validateField)


function onSubmit(value: any){
    console.log(value);    
}

function validateField(value: string) {
  if (!value) {
    return 'this field is required';
  }

  if (value.length < 8) {
    return 'this field must contain at least 8 characters';
  }

  return true;
}

</script>

<style lang="scss" scoped>

.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 400px;
    height: 400px;
    background-color: #EBCFB2;
    border-radius: 5px;

    h2{
        text-align: center;
        margin-top: 5px;
    }

    p{
        margin-left: 5px;
        margin-top: 15px;
    };

    input{
        margin-left: 5px;
    };

    button{
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 40px;
        background-color: #FFFFFF;
        border-radius: 5px;
    }
}

</style>