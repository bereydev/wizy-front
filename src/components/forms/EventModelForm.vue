<script setup lang="ts">
import { EventModel } from '~/interface';

interface Props {
    eventModel?: EventModel;
}

const props = defineProps<Props>() 

</script>
<template>
    <form>
      <div class="flex flex-row" style="align-items: flex-start;"> 
        <div class="flex flex-col max-w-md">
          <div class=" flex flex-row m-2">
              <va-color-palette class="mt-3 ml-2" :palette="[props.eventModel?.color]"/> 
              <input :value="props.eventModel?.name" class="text-3xl border-0 border-b-2 rounded-none">
          </div>
            <h2 class="m-2">Description</h2>
            <textarea class="m-2 h-16rem border-0 border-b-2 rounded-none resize-none">{{props.eventModel?.description}} </textarea>
        </div>
        <div class="ml-4 flex flex-row">
          <div class="flex flex-col">
            <h2 class="m-2">Nom section</h2>
            <li v-for="section in props.eventModel?.section" class="ml-2 mr-2 list-none">
              <input :value="section.name" class="mt-2">
            </li>
          </div>
          <div class="flex flex-col max-w-xs">
            <div class="flex flex-row">
              <h2 class="m-2">Confidentialité</h2>
              <va-button-dropdown class="mr-48" size="small" label="?" hide-icon>La Confidentialité est un paramètre</va-button-dropdown>
            </div>
            <li v-for="section in props.eventModel?.section" class="ml-2 mr-2 list-none">
              <va-select v-model="section.confidentiality" :options="['Public', 'Confidentiel']" class="mt-2"/>
            </li>
          </div>
        </div>
      </div>
    </form>
</template>