<template>
  <section
    class="fixed z-30 flex flex-col min-w-44 bg-neutral dark:bg-neutral-800 h-screen items-start"
  >
    <ULink
      class="text-4xl text-white flex mx-auto py-4 items-center gap-2 hover:text-white"
      to="/app"
    >
      <UIcon name="" class="text-primary-400" />
      <div class="font-bold text-2xl">LogiTrack</div>
    </ULink>
    <div class="mx-auto py-2 flex flex-col w-full px-2 gap-1 flex-1">
      <UButton
        v-for="m in menuItems"
        :icon="m.icon"
        variant="ghost"
        color="neutral"
        active-variant="solid"
        active-color="secondary"
        class="text-white text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-black"
        :to="m.to"
        >{{ m.label }}</UButton
      >
      <hr class="w-full border-neutral-700" />
    </div>
    <div class="mx-auto py-2 flex flex-col w-full px-2 gap-1 flex-1">
      <UButton
        v-for="m in menuItems1"
        :icon="m.icon"
        variant="ghost"
        color="neutral"
        active-variant="solid"
        active-color="secondary"
        class="text-white text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-black"
        :to="m.to"
        >{{ m.label }}</UButton
      >
      <hr class="w-full border-neutral-700" />
    </div>
    <hr class="w-full border-neutral-700" />
    <div class="w-full flex flex-col px-2 gap-1 py-4">
      <UButton
        icon="i-material-symbols-settings-outline"
        label="Settings"
        variant="ghost"
        color="primary"
        active-variant="solid"
        active-color="primary"
        class="text-white hover:bg-primary-700 dark:hover:bg-primary-500 dark:hover:text-black"
        to="/app/settings"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = ref<NavigationMenuItem[]>([
  {
    label: "Inicio",
    icon: "material-symbols:home-outline-rounded",
    to: "/app/",
  },
  {
    label: "Controle de Entregas",
    icon: "uil:truck",
    to: "/app/controleDeEntregas",
  },
  {
    label: "Compra de Materiais",
    icon: "i-material-symbols-shopping-cart-outline",
    to: "/app/controleDeMateriais",
  },
  {
    label: "Controle de Vendas",
    icon: "prime:book",
    to: "/app/controleDeVendas",
  },
  {
    label: "Controle de OCs",
    icon: "jam:document",
    to: "/app/controleDeOCs",
  },
  {
    label: "Gastos Gerais",
    icon: "i-material-symbols-credit-card-outline",
    to: "/app/gastosGerais",
  },
]);
const menuItems1 = ref<NavigationMenuItem[]>([
  {
    label: "Entrada e Saída",
    icon: "streamline-ultimate:accounting-coins",
    to: "/app/entradaESaida",
  },
  {
    label: "Contas",
    icon: "mingcute:paper-line",
    to: "/app/contas",
  },
  {
    label: "Controle de Estoque",
    icon: "lsicon:management-stockout-outline",
    to: "/app/controleDeEstoque",
  },
]);
</script>
