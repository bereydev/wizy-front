<script setup lang="ts">
const start = computed(() => new Date(`${startDateString.value} ${startTimeString.value}`));
const end = computed<Date>(() => new Date(`${startDateString.value} ${endTimeString.value}`));
const now = new Date()
function completeZero(value: number) {
    return (value < 10 ? '0' : '') + value
}
const startDateString = ref(`${now.getFullYear()}-${completeZero(now.getMonth() + 1)}-${completeZero(now.getDate())}`)
const startTimeString = ref(`${completeZero(now.getHours())}:${completeZero(now.getMinutes())}`)
const endTimeString = ref(`${completeZero(now.getHours() + 1)}:${completeZero(now.getMinutes())}`)

defineExpose({
    start,
    end
})
</script>

<template>
<div class="flex w-full space-x-2">
        <div class="w-full">
            <label for="date" class="form-label">Date</label>
            <input type="date" class="field" v-model="startDateString" />
        </div>
        <div class="w-full">
            <label for="start-time" class="form-label">Début</label>
            <input type="time" class="field" v-model="startTimeString" step="300" />
        </div>
        <IconoirArrowRight class="h-20 w-20" />
        <div class="w-full">
            <label for="end-time" class="form-label">Fin</label>
            <input type="time" class="field" v-model="endTimeString" step="300" />
        </div>
    </div>
</template>