<template>
  <span v-if="props.iconUnicode">
    <span v-html="`&#x${props.iconUnicode};`"></span>
  </span>

</template>

<script setup lang="tsx">
const props = defineProps<{
  iconUnicode?: string;
}>()
</script>

<script lang="tsx">
/**
 * @description emoji图标
 * thanx: @fatevase
 * https://github.com/fatevase/SiYuanDailyViews/blob/dev/src/components/Emoji.vue
 */
export default {
  name:'EmojiIcon',
}
</script>

<style scoped>

</style>
