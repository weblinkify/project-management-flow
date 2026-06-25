export type InvoiceStatus =
  | "paid"
  | "unpaid"
  | "overdue";

export type Currency =
  | "EUR"
  | "PKR";

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  currency: Currency;
}
