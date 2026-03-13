<template>
  <div class="p-7">
    <div class="flex gap-3 items-center mb-2">
      <UIcon name="game-icons:mine-truck" class="text-5xl" />
      <h1 class="text-4xl font-bold">Controle de Vendas</h1>
    </div>
    <UBadge
      leading-icon="tabler:table"
      color="neutral"
      variant="outline"
      class="font-bold text-md rounded-4xl py-2 px-4 bg-neutral-700"
      >Tabela</UBadge
    >
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
</script>
