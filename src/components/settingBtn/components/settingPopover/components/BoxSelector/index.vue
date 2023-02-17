<template>
    <a-select
        v-model:value="selected"
        :options="notebookOptions"
        v-bind="$attrs"
    ></a-select>
</template>

<script lang="tsx">
export default {
    name: 'BoxSelector',
};
</script>

<script lang="tsx" setup>
import { usePublicStore } from '/@/store/modules/public';
import { computed, toRefs } from 'vue';
const publicStore = usePublicStore();
const { setSelectedNotebookId } = publicStore;
const { notebookOptions, selectedNotebookId } = toRefs(publicStore);
const selected = computed({
    get: () => {
        return selectedNotebookId.value;
    },
    set: (val) => {
        setSelectedNotebookId(val);
    },
});
</script>

<style scoped></style>
