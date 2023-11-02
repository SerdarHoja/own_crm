<template>
      <a-form
        class="w-[430px] bg-white border-[1px] border-solid border-[#D0D5DD] px-8 py-10 rounded-3xl mt-9 mx-auto"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h3 class="text-4xl font-semibold text-center mb-5">Own CRM</h3>
        <a-form-item
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="formState.email" placeholder="Username" />
        </a-form-item>
    
        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="Password" />
        </a-form-item>
    
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" class="!bg-blue-600 w-full">Submit</a-button>
        </a-form-item>
      </a-form>
  </template>
  <script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useAuthStore } from '../stores/auth.module.js';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const loading = ref(false);
  const store = useAuthStore();
  const router = useRouter();
  interface FormState {
    email: string;
    password: string;
  }
  
  const formState = reactive<FormState>({
    email: '',
    password: '',
  });
  const onFinish = (values: any) => {
    loading.value = true;
    const formData = new FormData();
    formData.append('email', formState.email);
    formData.append('password', formState.password);
    store.login(formData).then(
      (response) => {
        if(response && response.result === 'error') {
          loading.value = false;
          message.error(response.text );
        } else {
          router.push("/places");
          loading.value = false;
          message.success('Login Success');
        } 
      }
    );
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  </script>
  
  