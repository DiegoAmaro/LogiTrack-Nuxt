<template>
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
      <UTable
        :data="data"
        :columns="columns"
        class="flex-1"
        :ui="{ tr: ' py-1 px-4' }"
      >
        <template #motorista-cell="{ row }">
          <USelect
            placeholder="Selecione"
            :items="[
              'Rone',
              'Vanderlei',
              'Gilson',
              'Victor',
              'Sivaldo',
              'Geleia',
            ]"
          />
        </template>
      </UTable>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const USelect = resolveComponent("USelect");
const UInputDate = resolveComponent("UInputDate");

type Payment = {
  date: string;
  nf: number;
  pedido: number;
  cliente: string;
  cond: string;
  obs: string;
  produto:
    | "AFR"
    | "AMR"
    | "AGR"
    | "AML"
    | "A REC"
    | "B0"
    | "B1"
    | "B2"
    | "B3"
    | "PEDRA"
    | "PEDRA M"
    | "PO";
  qtd: number;
  und: "M³" | "TN" | "CARG";
  custo: number;
  status: string;
  motorista: "Rone" | "Vanderlei" | "Gilson" | "Victor" | "Sivaldo" | "Geleia";
  frete: number;
  valorTotal: number;
};

const statusOptions = ref(["Pago", "A Receber"]);
const statusValue = ref("Pago");
const valorTotal = ref(10);
const custo = ref(5);
const frete = ref(valorTotal.value - custo.value);

const data = ref<Payment[]>([
  {
    date: "2024-03-11T15:30:00",
    nf: 1234,
    pedido: 5678,
    cliente: "John Doe",
    cond: "Berlim",
    obs: "FGR",
    produto: "AFR",
    qtd: 8,
    und: "M³",
    custo: custo.value,
    motorista: "Geleia",
    status: statusValue.value,
    frete: frete.value,
    valorTotal: valorTotal.value,
  },
  {
    date: "2024-03-11T15:30:00",
    nf: 1234,
    pedido: 5678,
    cliente: "John Doe",
    cond: "Berlim",
    obs: "FGR",
    produto: "AFR",
    qtd: 8,
    und: "M³",
    custo: custo.value,
    motorista: "Geleia",
    status: statusValue.value,
    frete: frete.value,
    valorTotal: valorTotal.value,
  },
  {
    date: "2024-03-11T15:30:00",
    nf: 1234,
    pedido: 5678,
    cliente: "John Doe",
    cond: "Berlim",
    obs: "FGR",
    produto: "AFR",
    qtd: 8,
    und: "M³",
    custo: custo.value,
    motorista: "Geleia",
    status: statusValue.value,
    frete: frete.value,
    valorTotal: valorTotal.value,
  },
  {
    date: "2024-03-11T15:30:00",
    nf: 1234,
    pedido: 5678,
    cliente: "John Doe",
    cond: "Berlim",
    obs: "FGR",
    produto: "AFR",
    qtd: 8,
    und: "M³",
    custo: custo.value,
    motorista: "Geleia",
    status: statusValue.value,
    frete: frete.value,
    valorTotal: valorTotal.value,
  },
  {
    date: "2024-03-11T15:30:00",
    nf: 1234,
    pedido: 5678,
    cliente: "John Doe",
    cond: "Berlim",
    obs: "FGR",
    produto: "AFR",
    qtd: 8,
    und: "M³",
    custo: custo.value,
    motorista: "Geleia",
    status: statusValue.value,
    frete: frete.value,
    valorTotal: valorTotal.value,
  },
]);

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
    header: "Uni.",
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

      return h(USelect, { placeholder: "Selecione", items: statusOptions });
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
</script>
