export interface ListRequest {
  filterList: FilterList;
  orderList?: OrderListEntity[] | null;
  pageSize: number;
  pageNumber: number;
}
interface FilterList {
  strCod: number;
  prdVldStatus: number;
}
interface OrderListEntity {
  strCod: string;
}

export const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};
