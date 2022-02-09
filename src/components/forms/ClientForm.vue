<script setup lang="ts">
import { useClientStore } from '~/stores/client';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup'
import type { Client } from "~/interface"
interface Props {
    client_placeholder?: Client;
}
const clientStore = useClientStore()
const { createClient, updateClient } = clientStore

function isRequired(value) {
    if (value && value.trim()) {
        return true;
    }
    return 'This is required';
}

const schema = yup.object({
    mail: yup.string(),
    lastName: yup.string(),
    first_name: yup.string(),
    company: yup.string(),
    address: yup.string(),
    address2: yup.string(),
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

const { mail, last_name, first_name, phones, company, address, address2, city, postcode, state, discount, price, note } = toRefs(client)

async function submitUpdate(values) {
    updateClient(values)
}
async function submitCreate(values) {
    createClient(values)
}
defineExpose({
    submitUpdate,
    submitCreate
})

function addPhoneField() {
    phones.value.push({
        label: "Téléphone bureau",
        number: ""
    })
}

function removePhoneField(index) {
    phones.value.splice(index, 1)
}


</script>
<template>
    <Form>
        <div class="mb-2 w-full">
            <Field name="firstName" :validate-schema="schema"></Field>
            <ErrorMessage name="firstName" />
        </div>

        <h2 class="mb-2">Informations de contact</h2>
        <div class="flex items-center">
            <div class="w-1/3 mr-4">
                <AvatarField></AvatarField>
            </div>
            <div class="w-2/3">
                <label for="last-name" class="form-label">Nom de famille</label>
                <input
                    type="text"
                    placeholder="Nom de famille"
                    class="field"
                    access="false"
                    v-model="last_name"
                />
                <label for="first-name" class="form-label">Prénom</label>
                <input
                    id="first-name"
                    type="text"
                    placeholder="Prénom"
                    class="field"
                    name="first-name"
                    access="false"
                    v-model="first_name"
                />
            </div>
        </div>
        <label for="email-address" class="form-label">Adresse email</label>
        <input type="email" placeholder="Adresse email" class="field" access="false" v-model="mail" />

        <label for="phone" class="form-label">Numéro(s) de téléphone</label>
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
        <Button class="w-full" type="button" @click="addPhoneField()">Ajouter un numéro de téléphone</Button>
        <h2 class="mt-3">Adresse</h2>
        <input
            id="address"
            type="text"
            placeholder="Adresse"
            class="field"
            name="address"
            access="false"
            v-model="address"
        />
        <input
            id="address2"
            type="text"
            placeholder="Complément d'adresse"
            class="field"
            name="address2"
            access="false"
            v-model="address2"
        />

        <div class="flex items-center">
            <div class="w-1/2 mr-4">
                <input
                    id="city"
                    type="text"
                    placeholder="Ville"
                    class="field"
                    name="city"
                    access="false"
                    v-model="city"
                />
            </div>
            <div class="w-1/2">
                <input
                    id="postcode"
                    type="text"
                    placeholder="Code postal"
                    class="field"
                    name="postcode"
                    access="false"
                    v-model="postcode"
                />
            </div>
        </div>

        <div class="flex items-center">
            <div class="w-1/2 mr-4">
                <input
                    id="state"
                    type="text"
                    placeholder="Pays"
                    class="field"
                    name="state"
                    access="false"
                    v-model="state"
                />
            </div>
            <div class="w-1/2"></div>
        </div>

        <h2>Comptabilité</h2>
        <label for="pdf-contract" class="form-label">PDF contract client</label>
        <input type="file" class="field" access="false" multiple="false" />
        <div class="flex items-center">
            <div class="w-1/2 mr-4">
                <label for="price" class="form-label">Tarif</label>
                <input type="number" class="field" access="false" min="0" step="1" v-model="price" />
            </div>
            <div class="w-1/2">
                <label for="discount" class="form-label">Taux de remise</label>
                <input
                    type="number"
                    class="field"
                    access="false"
                    min="0"
                    max="100"
                    step="1"
                    v-model="discount"
                />
            </div>
        </div>

        <h2>Note</h2>
        <textarea type="textarea" placeholder="Note" class access="false" rows="4" v-model="note" />
    </Form>
</template>