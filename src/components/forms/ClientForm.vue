<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup'
import type { Client } from "~/interface"
interface Props {
    client_placeholder?: Client;
    submitFunction: Function
}

const schema = yup.object({
    mail: yup.string().email(),
    last_name: yup.string(),
    first_name: yup.string(),
    company: yup.string(),
    address: yup.string(),
    address2: yup.string(),
    phones: yup.object(),
    city: yup.string(),
    postcode: yup.string(),
    state: yup.string(),
    discount: yup.number().max(100, "Attention votre taux de remise ne peux pas être supérieur à 100%").min(0, 'Votre taux de remise ne peux pas être négatif').required().default(0),
    price: yup.number().min(0, 'Nous vous conseillons fortement de ne pas appliquer de tarif négatif').required().default(0),
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

// const client = reactive(<Client>{
//     ...props.client_placeholder
// })

// const { last_name, first_name, phones, company, address, address2, city, postcode, state, discount, price, note } = toRefs(client)


const { handleSubmit } = useForm({
    validationSchema: schema
})

const onSubmit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
});

const { value: mail, errorMessage: mailError } = useField<string>('mail')
const { value: first_name, errorMessage: firstNameError } = useField<string>('first_name')
const { value: last_name, errorMessage: lastNameError } = useField<string>('last_name')
const { value: address, errorMessage: addressError } = useField<string>('address')
const { value: address2, errorMessage: address2Error } = useField<string>('address2')
const { value: city, errorMessage: cityError } = useField<string>('city')
const { value: postcode, errorMessage: postcodeError } = useField<string>('postcode')
const { value: state, errorMessage: stateError } = useField<string>('state')
const { value: price, errorMessage: priceError } = useField<string>('price')
const { value: discount, errorMessage: discountError } = useField<string>('discount')
const { value: note, errorMessage: noteError } = useField<string>('note')

async function submit() {
    console.log("boom c'est le formulaire client")
    handleSubmit(values => {
        alert(JSON.stringify(values, null, 2));
    })
}

defineExpose({
    submit
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
    <form @submit.prevent="onSubmit">
        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Informations de contact</h3>
        <div class="flex">
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
                    <input
                        id="first_name"
                        name="first_name"
                        placeholder="Prénom"
                        v-model="first_name"
                    />
                    <span class="error">{{ firstNameError }}</span>
                </div>
            </div>
        </div>
        <div class="mb-2 w-full">
            <label for="mail">Adresse e-mail</label>
            <input type="email" id="mail" placeholder="Adresse e-mail" v-model="mail" />
            <span class="error">{{ mailError }}</span>
        </div>
        <!-- <label for="phone" class="form-label">Numéro(s) de téléphone</label>
        <div class="flex space-x-4" v-for="phone, index in phones" :key="index">
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
            <input name="address" placeholder="Adresse" v-model="address" />
            <span class="error">{{ addressError }}</span>
        </div>
        <div class="mb-2 w-full">
            <input name="address2" placeholder="Complément d'adresse" v-model="address2" />
            <span class="error">{{ address2Error }}</span>
        </div>
        <div class="flex">
            <div class="mb-2 w-1/2 mr-4">
                <input id="city" name="city" placeholder="Ville" v-model="city" />
                <span class="error">{{ cityError }}</span>
            </div>
            <div class="mb-2 w-1/2">
                <input id="postcode" name="postcode" placeholder="Code postal" v-model="postcode" />
                <span class="error">{{ postcodeError }}</span>
            </div>
        </div>

        <div class="flex">
            <div class="mb-2 w-1/2 mr-4">
                <input id="state" name="state" placeholder="Pays" v-model="state" />
                <span class="error">{{ stateError }}</span>
            </div>

            <div class="w-1/2"></div>
        </div>

        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Comptabilité</h3>
        <label for="pdf-contract" class="form-label">PDF contract client</label>
        <input type="file" class="field" access="false" multiple="false" />
        <div class="flex">
            <div class="mb-2 w-1/2 mr-4">
                <label for="price">Tarif</label>
                <input
                    id="price"
                    name="price"
                    placeholder="Tarif"
                    type="number"
                    min="0"
                    step="1"
                    v-model="price"
                />
                <span class="error">{{ priceError }}</span>
            </div>
            <div class="mb-2 w-1/2">
                <label for="discount">Taux de remise</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    id="discount"
                    name="discount"
                    placeholder="Taux de remise"
                    v-model="discount"
                />
                <span class="error">{{ discountError }}</span>
            </div>
        </div>

        <h3 class="mb-2 px-2 py-1 rounded bg-gray-500 text-white">Note</h3>
        <div class="mb-2 w-full">
            <textarea
                id="note"
                name="note"
                placeholder="Saisisser un note à propos de ce client"
                v-model="note"
                rows="4"
            />
            <span class="error">{{ noteError }}</span>
        </div>
    </form>
</template>