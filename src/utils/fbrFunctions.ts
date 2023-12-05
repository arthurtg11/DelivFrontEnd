import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

export function NVL(v1: any, v2: any) {
  if (v1 == undefined || v1 == null) return v2;

  return v1;
}

export const formatValueToBRL = (value) => {
  const valorFormatado = parseInt(value.replace(/\D/g, "")); // Remove todos os caracteres que não são dígitos
  if (Number.isNaN(valorFormatado)) return value.replace(/\D/g, "");

  const valorEmBRL = (valorFormatado / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valorEmBRL;
};

export const covertNumberToBd = (value: string) => {
  const formatValue = parseFloat(value.replace(/[^\d]/g, ""));
  if (Number.isNaN(formatValue) || formatValue === 0) return 0;

  return formatValue / 100;
};

export const convertToBdNumber = (value) => {
  if (value == null || value == undefined) return value;
  return Number(value.replace(/\D/g, "")) / 100;
};

export const addErrorNotification = (message: string) => {
  addNotification("Erro", message, "danger");
};

export const addSuccessNotificationDefaultMessage = () => {
  addNotification("Notificação", "Operação Realizada com Sucesso!", "success");
};

export const addSuccessNotification = (message: string) => {
  addNotification("Notificação", message, "success");
};

export const addNotification = (
  title: string,
  message: string,
  type: NOTIFICATION_TYPE
) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};



export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function decode(expression, defaultValue, ...cases) {
  for (let i = 0; i < cases.length; i += 2) {
    if (expression === cases[i]) {
      return cases[i + 1];
    }
  }
  
  return defaultValue;
}