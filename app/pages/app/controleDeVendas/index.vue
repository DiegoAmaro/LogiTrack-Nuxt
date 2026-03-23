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
      :ui="{ footer: 'justify-between' }"
    >
      <UButton
        label="Adicionar Venda"
        color="primary"
        variant="outline"
        class="bottom-5 rounded-full fixed"
        icon="i-lucide-plus"
      />
      <template #body>
        <h2 class="text-sm font-semibold">Dados gerais da venda</h2>
        <div class="flex gap-3 my-2">
          <UFormField label="Data" class="text-xs">
            <UInput v-model="form.date" class="w-23" />
          </UFormField>
          <UFormField label="NF" class="text-xs">
            <UInput v-model="form.nf" class="w-13" />
          </UFormField>
          <UFormField label="Pedido" class="text-xs">
            <UInput v-model="form.pedido" class="w-15" />
          </UFormField>
          <UFormField label="Cliente" class="text-xs">
            <UInput v-model="form.cliente" class="w-27" />
          </UFormField>
          <UFormField label="Cond. Pagamento" class="text-xs">
            <UInput v-model="form.cond" />
          </UFormField>
        </div>
        <h2 class="text-sm font-semibold">Dados do produto</h2>
        <div class="flex gap-3 my-2 border border-neutral-700 p-4 rounded-md">
          <UFormField label="Produto" class="text-xs">
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
          <UFormField label="Qtd." class="text-xs">
            <UInput v-model="form.qtd" class="w-12" />
          </UFormField>
          <UFormField label="Und." class="text-xs">
            <USelect
              placeholder="Selecione"
              :items="['M³', 'TN', 'CARG']"
              v-model="form.und"
              class="w-23"
            />
          </UFormField>
          <UFormField label="Valor Unit." class="text-xs">
            <UInput v-model="form.valorUnit" class="w-18" />
          </UFormField>
          <UFormField label="Custo" class="text-xs">
            <UInput v-model="form.custo" class="w-15" />
          </UFormField>
        </div>
        <h2 class="text-sm font-semibold">Logística e Observações</h2>
        <div class="flex gap-3 my-2">
          <UFormField label="Status" class="text-xs">
            <USelect
              class="w-30"
              placeholder="Selecione"
              :items="['Pago', 'A Receber', 'Atrasado']"
              v-model="form.status"
            />
          </UFormField>
          <UFormField label="Motorista" class="text-xs">
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
          <UFormField label="Obs." class="text-xs">
            <UTextarea v-model="form.obs" :rows="1" class="w-53" />
          </UFormField>
        </div>
      </template>
      <template #footer="{ close }">
        <div>
          <h2 class="text-sm">Valor Total</h2>
          <p class="text-lg font-medium">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(form.valorUnit * form.qtd)
            }}
          </p>
        </div>
        <div class="flex gap-2">
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
        </div>
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
  valorUnit: 0,
  custo: 0,
  frete: 0,
  status: "",
  motorista: "",
  valorTotal: 0,
};

const form = reactive({ ...initialState });
const UBadge = resolveComponent("UBadge");
const USelect = resolveComponent("USelect");

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
  valorUnit: number;
  custo: number;
  frete: number;
  status: string;
  motorista: string;
  valorTotal: number;
};

const rows = ref<Payment[]>([]);

const calcularValorTotal = (row: any) => {
  return (
    Number.parseFloat(row.getValue("qtd") || 0) *
    Number.parseFloat(row.getValue("valorUnit") || 0)
  );
};

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
    accessorKey: "valorUnit",
    header: "Valor Unit.",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    cell: ({ row }) => {
      const valorUnit = Number.parseFloat(row.getValue("valorUnit"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorUnit);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        Pago: "success" as const,
        "A Receber": "warning" as const,
        Atrasado: "error" as const,
      }[row.getValue("status") as string];
      return h(UBadge, {
        label: row.getValue("status"),
        class: "capitalize",
        variant: "subtle",
        color,
      });
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
      const frete =
        calcularValorTotal(row) - Number.parseFloat(row.getValue("custo"));
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
      const valorTotal = calcularValorTotal(row);
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
