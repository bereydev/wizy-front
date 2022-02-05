vue
<script setup>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate';
function onSubmit(values) {
  console.log(values, null, 2);
}
const schema = yup.object({
  email: yup.string().required().email(),
});
// function validateEmail(value) {
//   // if the field is empty
//   if (!value) {
//     return 'This field is required';
//   }
//   // if the field is not a valid email
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//   if (!regex.test(value)) {
//     return 'This field must be a valid email';
//   }
//   // All is good
//   return true;
// }

</script>


<template>
    <Form @submit="onSubmit" :validation-schema="schema">
      <Field name="email" type="email"/>
      <ErrorMessage name="email" />
      <button>Sign up</button>
    </Form>
</template>