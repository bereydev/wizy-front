<script setup lang="ts">
import { EventModel } from '~/interface';

interface Props {
    eventModel: EventModel;
}

const props = defineProps<Props>() 

</script>
<template>
    <form>
      <div class="flex flex-row" style="align-items: flex-start;"> 
        <div class="flex flex-col max-w-md">
          <div class=" flex flex-row m-2">
              <va-color-palette class="mt-3 ml-2" :palette="['#4ae387']"/>
              <input :value="props.name" class="text-3xl border-0 border-b-2 rounded-none">
          </div>
            <h2 class="m-2">Description</h2>
            <textarea class="m-2 h-16rem border-0 border-b-2 rounded-none resize-none">{{props.description}} </textarea>
        </div>
        <div class="ml-4 flex flex-row">
          <div class="flex flex-col">
            <h2 class="m-2">Nom section</h2>
            <li v-for="n in 5" class="ml-2 mr-2 list-none">
              <input value="Section" class="mt-2">
            </li>
          </div>
          <div class="flex flex-col max-w-xs">
            <div class="flex flex-row">
              <h2 class="m-2">Confidentialité</h2>
              <va-button-dropdown class="mr-48" size="small" label="?" hide-icon>
            La Confidentialité est un paramètre qui permet de faire des choses incroyable </va-button-dropdown>
            </div>
            <li v-for="n in 5" class="ml-2 mr-2 list-none">
              <va-select v-model="value" :options="adefinir" class="mt-2"/>
            </li>
          </div>
        </div>
      </div>
    </form>
</template>