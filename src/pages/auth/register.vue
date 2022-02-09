<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { register } = userStore
const router = useRouter()

const schema = yup.object({
  firstName: yup.string().required("Champ obligatoire"),
  lastName: yup.string().required("Champ obligatoire"),
  username: yup.string().required("Champ obligatoire").email("Votre nom d'utilisateur doit être une addresse e-mail valide"),
  password: yup.string().required("Champ obligatoire").min(8, "Votre mot de passe doit avoir au moins 8 charactères").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    "Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un nombre"
  ),
  repeatPassword: yup.string().required("Champ obligatoire").oneOf([yup.ref('password'), null], 'Vos mot de passes sont différent')
});

async function onSubmit(values) {
  try {
    await register(values.username, values.password, values.firstName, values.lastName)
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <h1 class="text-4xl font-semibold">Hello! Prêt à booster votre activité ?</h1>
    <p
      class="w-10/12 font-semibold text-gray-600 text-sm"
    >Bienvenu chez WizyTime le premier CRM français dédié aux coachs</p>
  </div>
    <Form @submit="onSubmit" :validation-schema="schema" class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
      <div class="w-full mb-2">
        <Field name="firstName" type="text" autocomplete="given-name" placeholder="Prénom" />
        <ErrorMessage class="error" name="firstName" />
      </div>
      <div class="w-full mb-2">
        <Field name="lastName" type="text" autocomplete="family-name" placeholder="Nom de famille" />
        <ErrorMessage class="error" name="lastName" />
      </div>
      <div class="w-full mb-2">
        <Field name="username" type="email" autocomplete="username" placeholder="Adresse e-mail" />
        <ErrorMessage class="error" name="username" />
      </div>
      <div class="w-full mb-2">
        <Field
          name="password"
          type="password"
          autocomplete="new-password"
          placeholder="Mot de passe"
        />
        <ErrorMessage class="error" name="password" />
      </div>
      <div class="w-full mb-2">
        <Field
          name="repeatPassword"
          type="password"
          autocomplete="new-password"
          placeholder="Répéter le mot de passe"
        />
        <ErrorMessage class="error" name="repeatPassword" />
      </div>
      <Button type="submit" class="w-full">S'inscrire</Button>
    </Form>
    <div class="text-right w-full mt-4">
      <router-link
        class="text-sm font-bold text-teal-500 hover:underline cursor-pointer"
        to="/auth/login"
      >Vous avez déjà un compte ?</router-link>
    </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
