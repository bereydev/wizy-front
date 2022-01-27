import { Ref } from 'vue'
import { BaseData } from '~/interface';

export function addToStore(array: Ref<Array<BaseData>>, item: BaseData): void {
    array.value.push(item)
}

export function updateInStore(array: Ref<Array<BaseData>>, item: BaseData): void {
    const itemIndex = array.value.findIndex(x => x.id == item.id);
    array.value[itemIndex] = item;
}

export function deleteInStore(array: Ref<Array<BaseData>>, item: BaseData): void {
    const itemIndex = array.value.findIndex(x => x.id == item.id)
    if (itemIndex >= 0)
        array.value.splice(itemIndex, 1)
}