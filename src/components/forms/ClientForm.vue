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
        <Separator>Informations de contact</Separator>
        <div class="flex">
            <div class="w-1/3 mr-4">
                <AvatarField></AvatarField>
            </div>
            <div class="w-2/3">
                <Field label="Prénom" name="first_name"></Field>
                <Field label="Nom de famille" name="last_name"></Field>
            </div>
        </div>
        <Field label="Adresse e-mail" name="mail" type="email"></Field>

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
        <Separator>Adresse</Separator>
        <div class="w-full space-y-2">
            <Field label="Adresse" name="address"></Field>

            <Field label="Complément d'adresse" name="address2"></Field>

            <div class="flex justify- between space-x-2">
                <Field label="Ville" name="city"></Field>
                <Field label="Code postal" name="postcode"></Field>
            </div>
        </div>

        <div class="flex">
            <div class="mb-2 w-1/2 mr-4">
                <input id="state" name="state" placeholder="Pays" v-model="state" />
                <span class="error">{{ stateError }}</span>
            </div>

            <div class="w-1/2"></div>
        </div>
        <Separator>Comptabilité</Separator>
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

        <Separator>Note</Separator>
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