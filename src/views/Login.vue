<template>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
  
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
  
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" class="!bg-blue-600">Submit</a-button>
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
  
  