<template>
  <div>
    <div class="flex justify-between items-center py-4">
      <div>
        <div>
          <h1>Vendas do LogiTrack</h1>
          <ul>
            <li v-for="venda in vendas" :key="venda.id">
              {{ venda.cliente }} - R$ {{ venda.valor }}
            </li>
          </ul>
        </div>
        <h3 class="text-2xl font-bold">Batatas</h3>
        <p class="text-sm text-muted">
          Welcome back! Here what's happening at your restaurant today.
        </p>
      </div>
      <UBadge
        leading-icon="i-mdi-light-clock"
        color="neutral"
        variant="outline"
        class="font-semibold"
        >Live Updates</UBadge
      >
    </div>
    <section class="flex flex-col mt-4 gap-4">
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard
          class="bg-foreground dark:bg-neutral-800 shadow-md"
          v-for="c in card"
        >
          <div class="flex items-start justify-between pb-2">
            {{ c.title }}
            <UIcon :name="c.icon" :class="c.iconColor" class="m-1"></UIcon>
          </div>
          <div class="pt-2">
            <h4 class="text-2xl font-bold" :class="c.iconColor">
              {{ c.count }}
            </h4>
            <p class="text-xs text-muted">{{ c.description }}</p>
          </div>
        </UCard>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UCard class="bg-foreground dark:bg-neutral-800">
          <div class="flex flex-col pb-2 gap-2">
            <h5 class="font-bold">Quick Actions</h5>
            <p class="text-xs text-muted">
              Common tasks for restaurant management
            </p>
          </div>
          <div class="pt-2 flex flex-col gap-2">
            <UButton
              label="Manage Tables"
              icon="i-material-symbols-table-bar-outline-sharp"
              class="w-full"
              variant="subtle"
              color="neutral"
            />
            <UButton
              label="View Orders"
              icon="i-material-symbols-shopping-cart-outline"
              class="w-full"
              variant="subtle"
              color="neutral"
            />
            <UButton
              label="Kitchen Status"
              icon="i-lucide-chef-hat"
              class="w-full"
              variant="subtle"
              color="neutral"
            />
          </div>
        </UCard>
        <UCard class="bg-foreground dark:bg-neutral-800">
          <div class="flex flex-col pb-2 gap-2">
            <h5 class="font-bold">Recent Activity</h5>
            <p class="text-xs text-muted">
              Latest updates from your restaurant
            </p>
          </div>
          <div class="pt-2 flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UBadge color="success" size="sm">New</UBadge>
              <p class="text-sm">Table 7 seated - Party of 4</p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge color="primary" size="sm">Order</UBadge>
              <p class="text-sm">Order #1247 ready for pickup</p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge color="error" size="sm">Alert</UBadge>
              <p class="text-sm">Kitchen running behind schedule</p>
            </div>
          </div>
        </UCard>
        <UCard class="bg-foreground dark:bg-neutral-800">
          <div class="flex flex-col pb-2 gap-2">
            <h5 class="font-bold flex items-center gap-2">
              <UIcon
                name="i-mdi-alert-circle-outline"
                class="text-error"
              ></UIcon
              >Alerts
            </h5>
            <p class="text-xs text-muted">Items requiring attention</p>
          </div>
          <div class="pt-2 flex flex-col gap-2">
            <UAlert
              color="error"
              variant="subtle"
              title="Kitchen Delay"
              description="Orders are running 5 minutes behind schedule"
              :ui="{
                root: 'p-3',
                description: 'text-xs',
              }"
            />
            <UAlert
              color="warning"
              variant="subtle"
              title="Low Stock"
              description="Salmon portions running low (3 remaining)"
              :ui="{
                root: 'p-3',
                description: 'text-xs',
              }"
            />
          </div>
        </UCard>
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
const { data: vendas } = await useFetch("/api/vendas");
const card = ref([
  {
    title: "Active Tables",
    icon: "i-material-symbols-table-bar-outline-sharp",
    iconColor: "text-primary",
    count: "12/20",
    description: "+2 from last hour",
  },
  {
    title: "Pending Orders",
    icon: "i-material-symbols-shopping-cart-outline",
    iconColor: "text-error",
    count: "8",
    description: "Average wait: 12 min",
  },
  {
    title: "Kitchen Status",
    icon: "i-lucide-chef-hat",
    iconColor: "text-success",
    count: "Good",
    description: "5 dishes in progress",
  },
  {
    title: "Today's Revenue",
    icon: "i-mdi-dollar",
    iconColor: "text-primary",
    count: "$2,847",
    description: "+12% from yesterday",
  },
]);
</script>
