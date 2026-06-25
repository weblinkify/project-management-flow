import Sidebar from "../components/Sidebar";
import InvoiceCard from "../components/InvoiceCard";
import { Invoice } from "../types/invoice";

const invoices: Invoice[] = [
  {
    id: "1",
    clientName: "Acme Ltd",
    amount: 2000,
    status: "paid",
    dueDate: "2026-07-01",
    currency: "EUR"
  },
  {
    id: "2",
    clientName: "TechCorp",
    amount: 1500,
    status: "overdue",
    dueDate: "2026-06-15",
    currency: "EUR"
  }
];

export default function Invoices() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Invoices</h1>

        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      </main>
    </div>
  );
}
