const formatValueToBRL = (value) => {
  const valorFormatado = parseInt(value.replace(/\D/g, "")); // Remove todos os caracteres que não são dígitos
  if (Number.isNaN(valorFormatado)) return value.replace(/\D/g, "");

  const valorEmBRL = (valorFormatado / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valorEmBRL;
};
const teste = formatValueToBRL("2500");
console.log(teste)
console.log(teste.replace(/[^\d]/g, "") / 100);
