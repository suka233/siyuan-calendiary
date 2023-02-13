<template>
    <a-drawer v-model:visible="visible"></a-drawer>
</template>

<script lang="ts">
export default {
    name: 'SettingDrawer',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
}>();

const visible = computed({
    get() {
        return props.visible;
    },
    set(visible) {
        emit('update:visible', visible);
    },
});
</script>

<style scoped></style>
