import { watch } from 'vue';
import type { Ref } from 'vue'

const timeOut = (varName: Ref<boolean>, time: number) => {
    return watch(varName, (nV: boolean) => {
        if (nV) {
            setTimeout(() => {
                varName.value = false;
            }, time);
        }
    });
}

export default {
    timeOut
}