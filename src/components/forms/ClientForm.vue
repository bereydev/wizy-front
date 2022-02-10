<script setup lang="ts">
import { useClientStore } from '~/stores/client';
import { Field, Form, ErrorMessage, useForm, useField, useFormValues } from 'vee-validate';
import * as yup from 'yup'
import type { Client } from "~/interface"
interface Props {
    client_placeholder?: Client;
}
const clientStore = useClientStore()
const { createClient, updateClient } = clientStore

const schema = yup.object({
    mail: yup.string(),
    last_name: yup.string(),
    first_name: yup.string(),
    company: yup.string(),
    address: yup.string(),
    address2: yup.string(),
    phones: yup.object(),
    city: yup.string(),
    postcode: yup.string(),
    state: yup.string(),
    discount: yup.number().max(100).min(0).required(),
    price: yup.number().min(0).required(),
    note: yup.string()
});

const props = withDefaults(defineProps<Props>(), {
    client_placeholder: () => <Client>{
        mail: "",
        last_name: "",
        first_name: "",
        phones: [
            {
                label: "Téléphone",
                number: ""
            },
        ],
        company: "",
        address: "",
        address2: "",
        city: "",
        postcode: "",
        state: "",
        discount: 0,
        price: 0,
        note: "",
    }
})

const client = reactive(<Client>{
    ...props.client_placeholder
})

// const { last_name, first_name, phones, company, address, address2, city, postcode, state, discount, price, note } = toRefs(client)


const { handleSubmit } = useForm({
    initialValues: {
        ...props.client_placeholder
    }, validationSchema: schema
})

const { value: mail, errorMessage: mailError } = useField<string>('mail')
const { value: first_name, errorMessage: firstNameError } = useField<string>('mail')
const { value: last_name, errorMessage: lastNameError } = useField<string>('mail')
const { value: address, errorMessage: addressError } = useField<string>('mail')
const { value: address2, errorMessage: address2Error } = useField<string>('mail')
const { value: city, errorMessage: cityError } = useField<string>('mail')
const { value: postcode, errorMessage: postcodeError } = useField<string>('mail')
const { value: state, errorMessage: stateError } = useField<string>('mail')

async function submitUpdate() {
    updateClient(values.value)
}
async function submitCreate(values) {
    createClient({ ...values })
}
defineExpose({
    submitUpdate,
    submitCreate
})

// function addPhoneField() {
//     phones.value.push({
//         label: "Téléphone bureau",
//         number: ""
//     })
// }

// function removePhoneField(index) {
//     phones.value.splice(index, 1)
// }


</script>
<template>
    <form @submit.prevent="submitCreate">
        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Informations de contact</h3>
        <div class="flex items-center">
            <div class="w-1/3 mr-4">
                <AvatarField></AvatarField>
            </div>
            <div class="w-2/3">
                <div class="mb-2 w-full">
                    <label for="last_name">Nom de famille</label>
                    <input
                        id="last_name"
                        name="last_name"
                        placeholder="Nom de famille"
                        v-model="last_name"
                    />
                    <span class="error">{{ lastNameError }}</span>
                </div>

                <div class="mb-2 w-full">
                    <label for="first_name">Prénom</label>
                    <Field id="first_name" name="first_name" placeholder="Prénom"></Field>
                    <ErrorMessage name="first_name" />
                </div>
            </div>
        </div>
        <div class="mb-2 w-full">
            <label for="mail">Adresse e-mail</label>
            <input type="email" id="mail" placeholder="Adresse e-mail" v-model="mail" />
            <span class="error">{{ mailError }}</span>
        </div>
        <!-- <label for="phone" class="form-label">Numéro(s) de téléphone</label>
        <div class="flex items-center space-x-4" v-for="phone, index in phones" :key="index">
            <input
                id="label"
                type="text"
                placeholder="Type de téléphone"
                class="w-1/3"
                name="phone"
                access="false"
                v-model="phone.label"
            />
            <input
                id="phone"
                type="tel"
                placeholder="Numéro de téléphone"
                class="w-2/3"
                name="phone"
                access="false"
                v-model="phone.number"
            />
            <iconoir:trash
                @click="removePhoneField(index)"
                class="cursor-pointer text-red-500 my-auto"
            ></iconoir:trash>
        </div>
        <Button class="w-full" type="button" @click="addPhoneField()">Ajouter un numéro de téléphone</Button>-->
        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Adresse</h3>
        <div class="mb-2 w-full">
            <Field id="address" name="address" placeholder="Adresse"></Field>
            <ErrorMessage name="address" />
        </div>
        <div class="mb-2 w-full">
            <Field id="address2" name="address2" placeholder="Complément d'adresse"></Field>
            <ErrorMessage name="address2" />
        </div>
        <div class="flex items-center">
            <div class="mb-2 w-1/2 mr-4">
                <Field id="city" name="city" placeholder="Ville"></Field>
                <ErrorMessage name="city" />
            </div>
            <div class="mb-2 w-1/2">
                <Field id="postcode" name="postcode" placeholder="Code postal"></Field>
                <ErrorMessage name="postcode" />
            </div>
        </div>

        <div class="flex items-center">
            <div class="mb-2 w-1/2 mr-4">
                <Field id="state" name="state" placeholder="Pays"></Field>
                <ErrorMessage name="state" />
            </div>

            <div class="w-1/2"></div>
        </div>

        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Comptabilité</h3>
        <label for="pdf-contract" class="form-label">PDF contract client</label>
        <input type="file" class="field" access="false" multiple="false" />
        <div class="flex items-center">
            <div class="mb-2 w-1/2 mr-4">
                <label for="price">Tarif</label>
                <Field type="number" min="0" step="1" id="price" name="price" placeholder="Tarif"></Field>
                <ErrorMessage name="price" />
            </div>
            <div class="mb-2 w-1/2">
                <label for="discount">Taux de remise</label>
                <Field
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    id="discount"
                    name="discount"
                    placeholder="Taux de remise"
                ></Field>
                <ErrorMessage name="discount" />
            </div>
        </div>

        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Note</h3>
        <div class="mb-2 w-full">
            <Field
                id="state"
                name="state"
                placeholder="Saisisser un note à propos de ce client"
                as="textarea"
                rows="4"
            ></Field>
            <ErrorMessage name="state" />
        </div>
    </form>
</template>