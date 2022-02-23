<script setup lang="ts">
import { useClientStore } from '~/stores/client'
import { useUserStore } from '~/stores/user'
import { Client } from '~/interface'
import ClientModal from '../components/ClientModal.vue'

const clientStore = useClientStore()
const userStore = useUserStore()
const { getClients, getClientsInAlphabeticalOrder } = clientStore
const { logout } = userStore
const router = useRouter()

onMounted(async () => {
    try {
        await getClients()
    } catch (error: any) {
        console.error(error.response.status)
        console.table(error.response.data.detail)
        if (error.response.status == 403) {
            // Unvalidate the access token and redirect to login
            logout()
            router.push('/auth/login')
        } else if (error.response.status == 422) {
            return
        }
    }
})

const clients = ref<Array<Client>>(getClientsInAlphabeticalOrder())

const clientModal = ref<InstanceType<typeof ClientModal>>()

const columns = [
    { key: 'first_name', sortable: true },
    { key: 'mail', sortable: true },
    { key: 'address', sortable: true },
    { key: 'company' },
]

const filter = ref('')

const useCustomFilteringFn = ref(false)

const filteredCount = ref(clients.value.length)

const customFilteringFn = computed(() => useCustomFilteringFn.value ? filterExact : undefined)

function filterExact(source) {
    if (filter.value === '') return true

    return source?.toString?.() === filter.value
}

</script>


<template>
    <div class="row">
        <va-input class="flex mb-2 md6" placeholder="Filter..." v-model="filter" />

        <va-checkbox
            class="flex mb-2 md6"
            label="Use custom filtering function (looks for an exact match)"
            v-model="useCustomFilteringFn"
        />
    </div>

    <va-data-table
        :items="clients"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
    />
    <div
        v-if="getClientsInAlphabeticalOrder().length <= 0"
        class="w-full flex flex-col justify-center items-center h-100"
    >
        <h1>🥺</h1>
        <h1 class="font-weight-10 mb-5">Votre fichier client est vide</h1>
        <Button @click="clientModal?.toggle">🎉 Ajouter votre premier client 🎉</Button>
    </div>

    <va-alert class="mt-3" border="left">
        <span>
            Number of filtered items:
            <va-chip>{{ filteredCount }}</va-chip>
        </span>
    </va-alert>
    <ClientModal ref="clientModal"></ClientModal>
</template>