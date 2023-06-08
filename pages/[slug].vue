<script lang="ts" setup>
const route = useRoute();
const params = ref<string>(route.query.name as string);
</script>

<template>
  <div>
    <span>Params:</span>
    <div>{{ params }}</div>
  </div>
</template>
