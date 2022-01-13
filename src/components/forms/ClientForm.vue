<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import type { Client } from "~/interface"
interface Props {
    client_placeholder?: Client;
}
const user = useUserStore()

const props = withDefaults(defineProps<Props>(), {
    client_placeholder: () => <Client>{
        mail: "",
        last_name: "",
        first_name: "",
        phone: "",
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

const { mail, last_name, first_name, phone, company, address, address2, city, postcode, state, discount, price, note } = toRefs(client)

async function submitUpdate() {
    user.updateClient(client)
}
async function submitCreate() {
    user.createClient(client)
}
defineExpose({
    submitUpdate,
    submitCreate
})


</script>
<template>
    <form>
        <label for="profile-picture" class="form-label">Photo de profile</label>
        <input type="file" class="field" access="false" multiple="false" />

        <label for="email-address" class="form-label">Adresse email</label>
        <input type="email" placeholder="Adresse email" class="field" access="false" v-model="mail" />

        <div class="flex items-center">
            <div class="w-1/2 mr-4">
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
            <div class="w-1/2">
                <label for="last-name" class="form-label">Nom de famille</label>
                <input
                    type="text"
                    placeholder="Nom de famille"
                    class="field"
                    access="false"
                    v-model="last_name"
                />
            </div>
        </div>
        <label for="company" class="form-label">Entreprise</label>
        <input type="text" placeholder="Entreprise" class="field" access="false" v-model="company" />

        <label for="address" class="form-label">Adresse</label>
        <input
            id="address"
            type="text"
            placeholder="Adresse"
            class="field"
            name="address"
            access="false"
            v-model="address"
        />

        <label for="address2" class="form-label">Complément d'adresse</label>
        <input
            id="address2"
            type="text"
            placeholder="Complément d'adresse"
            class="field"
            name="address2"
            access="false"
            v-model="address2"
        />

        <label for="state" class="form-label">Pays</label>
        <input
            id="state"
            type="text"
            placeholder="Pays"
            class="field"
            name="state"
            access="false"
            v-model="state"
        />

        <div class="flex items-center">
            <div class="w-1/2 mr-4">
                <label for="city" class="form-label">Ville</label>
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
                <label for="postcode" class="form-label">Code postal</label>
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

        <label for="phone" class="form-label">Numéro de téléphone</label>
        <input
            id="phone"
            type="tel"
            placeholder="Numéro de téléphone"
            class="field"
            name="phone"
            access="false"
            v-model="phone"
        />
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

        <label for="pdf-contract" class="form-label">PDF contract client</label>
        <input type="file" class="field" access="false" multiple="false" />

        <label for="note" class="form-label">Note</label>
        <textarea
            type="textarea"
            placeholder="Note"
            class="field"
            access="false"
            rows="4"
            v-model="note"
        />
    </form>
</template>