export default defineEventHandler(async (event) => {
  // O body é onde chegam os dados do formulário
  const body = await readBody(event);

  // Por enquanto, vamos só devolver o que recebeu pra testar
  console.log("Recebi no servidor:", body);

  return {
    message: "Venda salva com sucesso!",
    data: body,
  };
});
