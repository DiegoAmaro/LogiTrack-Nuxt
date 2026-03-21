<template class="flex flex-col min-h-screen">
  <div class="ml-10 mt-10">
    <section>
      <div class="flex gap-3 items-center mb-2">
        <UIcon name="game-icons:mine-truck" class="text-4xl" />
        <h1 class="text-3xl font-bold">Controle de Vendas</h1>
      </div>
      <UBadge
        leading-icon="tabler:table"
        color="neutral"
        variant="outline"
        class="font-bold text-xs rounded-4xl py-2 px-4 bg-neutral-800"
        >Tabela</UBadge
      >
    </section>
    <section>
      <UTable :data="rows" :columns="columns" class="flex-1 z-2" />
    </section>
  </div>
  <footer
    class="fixed bottom-0 mt-auto ml-10 h-18 w-full z-20 bg-neutral-900 border-t-1 border-neutral-700"
  >
    <UModal
      v-model:open="open"
      title="Nova Venda"
      description="Formulário para adicionar nova venda"
      :ui="{ footer: 'justify-end' }"
    >
      <UButton
        label="Adicionar Venda"
        color="primary"
        variant="outline"
        class="bottom-5 rounded-full fixed"
        icon="i-lucide-plus"
      />
      <template #body>
        <div class="grid grid-cols-4 gap-4">
          <UFormField label="Data">
            <UInput v-model="form.date" class="w-27" />
          </UFormField>
          <UFormField label="NF">
            <UInput v-model="form.nf" class="w-27" />
          </UFormField>
          <UFormField label="Pedido">
            <UInput v-model="form.pedido" class="w-27" />
          </UFormField>
          <UFormField label="Cliente">
            <UInput v-model="form.cliente" class="w-27" />
          </UFormField>
          <UFormField label="Cond.">
            <UInput v-model="form.cond" class="w-27" />
          </UFormField>
          <UFormField label="Obs.">
            <UInput v-model="form.obs" class="w-27" />
          </UFormField>
          <UFormField label="Produto">
            <USelect
              class="w-27"
              placeholder="Selecione"
              :items="[
                'AFR',
                'AMR',
                'AGR',
                'AML',
                'A REC',
                'B0',
                'B1',
                'B2',
                'B3',
                'PEDRA',
                'PEDRA M',
                'PO',
              ]"
              v-model="form.produto"
            />
          </UFormField>
          <UFormField label="Qtd.">
            <UInput v-model="form.qtd" class="w-27" />
          </UFormField>
          <UFormField label="Und.">
            <USelect
              placeholder="Selecione"
              :items="['M³', 'TN', 'CARG']"
              v-model="form.und"
            />
          </UFormField>
          <UFormField label="Custo">
            <UInput v-model="form.custo" class="w-27" />
          </UFormField>
          <UFormField label="Status">
            <USelect
              class="w-27"
              placeholder="Selecione"
              :items="['Pago', 'A Receber']"
              v-model="form.status"
            />
          </UFormField>
          <UFormField label="Motorista">
            <USelect
              class="w-27"
              placeholder="Selecione"
              :items="[
                'Rone',
                'Vanderlei',
                'Gilson',
                'Victor',
                'Sivaldo',
                'Geleia',
              ]"
              v-model="form.motorista"
            />
          </UFormField>
          <UFormField label="Valor Total">
            <UInput v-model="form.valorTotal" class="w-27" />
          </UFormField>
        </div>
      </template>
      <template #footer="{ close }">
        <UButton
          label="Cancelar"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <UButton
          label="Adicionar"
          color="primary"
          type="submit"
          @click="adicionarRegistro(close)"
        />
      </template>
    </UModal>
  </footer>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { ref, reactive } from "vue";

const open = ref(false);

const initialState = {
  date: "",
  nf: "",
  pedido: "",
  cliente: "",
  cond: "",
  obs: "",
  produto: "",
  qtd: 0,
  und: "",
  custo: 0,
  status: "",
  motorista: "",
  valorTotal: 0,
};

const form = reactive({ ...initialState });

const frete = ref(Number(form.valorTotal) - Number(form.custo));

const inputDate = useTemplateRef("inputDate");

const UBadge = resolveComponent("UBadge");
const USelect = resolveComponent("USelect");
const UInputDate = resolveComponent("UInputDate");
const UPopover = resolveComponent("UPopover");

type Payment = {
  date: string;
  nf: string;
  pedido: string;
  cliente: string;
  cond: string;
  obs: string;
  produto: string;
  qtd: number;
  und: string;
  custo: number;
  status: string;
  motorista: string;
  valorTotal: number;
};

const statusOptions = ref(["Pago", "A Receber"]);
const statusValue = ref("Pago");

const rows = ref<Payment[]>([]);

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
      });
    },
  },
  {
    accessorKey: "nf",
    header: "NF",
  },
  {
    accessorKey: "pedido",
    header: "Pedido",
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "cond",
    header: "Cond.",
  },
  {
    accessorKey: "obs",
    header: "Obs.",
  },
  {
    accessorKey: "produto",
    header: "Prod.",
  },
  {
    accessorKey: "qtd",
    header: "Qtd.",
  },
  {
    accessorKey: "und",
    header: "Und.",
  },
  {
    accessorKey: "custo",
    header: "Custo",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    cell: ({ row }) => {
      const custo = Number.parseFloat(row.getValue("custo"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(custo);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        Pago: "success" as const,
        "A Receber": "warning" as const,
      }[row.getValue("status") as string];
      return h(UBadge, { label: row.getValue("status"), color });
    },
  },
  {
    accessorKey: "motorista",
    header: "Motorista",
  },
  {
    accessorKey: "frete",
    header: "Frete",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    cell: ({ row }) => {
      const frete = Number.parseFloat(row.getValue("frete"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(frete);
    },
  },
  {
    accessorKey: "valorTotal",
    header: "Valor Total",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    cell: ({ row }) => {
      const valorTotal = Number.parseFloat(row.getValue("valorTotal"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorTotal);
    },
  },
];
const adicionarRegistro = (close?: () => void) => {
  rows.value.push({ ...form });

  // Reseta o objeto form para o estado inicial sem perder a reatividade
  Object.assign(form, initialState);

  if (close) close();
};
</script>
