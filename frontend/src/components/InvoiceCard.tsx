import { Invoice } from "../types/invoice";

type Props = {
  invoice: Invoice;
};

export default function InvoiceCard({ invoice }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <div className="flex justify-between">
        <h2 className="font-bold">{invoice.clientName}</h2>
        <span>{invoice.status}</span>
      </div>

      <p className="mt-2 text-lg font-semibold">
        {invoice.currency} {invoice.amount}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Due: {invoice.dueDate}
      </p>
    </div>
  );
}
