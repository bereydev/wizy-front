<template>
  <form @submit="onSubmit" class="w-64">
    <input type="text" name="email" v-model="email"/>
    <button>Submit</button>
    {{values}}
  </form>
</template>
<script setup>
import { useForm, useField } from 'vee-validate';

    const { handleSubmit, values } = useForm();
    const { value:email } = useField('email');
    const onSubmit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2));
    });


</script>