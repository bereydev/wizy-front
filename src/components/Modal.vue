<script setup lang="ts">
const isOpen = ref(false)

function toggle() {
    isOpen.value = !isOpen.value
}
defineExpose({
    isOpen,
    toggle
})
</script>

<template>
    <div v-if="isOpen" class="text-left fixed flex inset-0 z-60 bg-gray-500 bg-opacity-75">
        <!-- Remove the 'max-h-96' on the div below to use the height of the content -->
        <div class="flex self-center items-center justify-center w-full h-full p-8">
            <!-- To adjust the width of the modal, change the 'max-w-md' on the div below to your liking -->
            <div class="flex flex-col bg-white rounded-md w-full max-h-full max-w-xl">
                <!-- Header -->
                <header class="p-4 border-b">
                    <div class="flex item-center justify-between">
                        <slot name="title"></slot>
                        <icon-park-outline:close class="cursor-pointer" @click="toggle" />
                    </div>
                </header>

                <!-- Content -->
                <div class="relative overflow-y-auto p-4">
                    <slot></slot>
                </div>

                <!-- Footer -->
                <footer class="p-4 border-t flex item-center justify-between">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </div>
</template>
