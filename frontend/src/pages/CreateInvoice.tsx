import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { AlertCircle, PlusCircle, X } from "lucide-react";

type InvoiceItem = {
  name: string;
  qty: number;
  price: number;
};

const VAT = 0.24;

export default function CreateInvoice() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    { name: "", qty: 1, price: 0 },
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const tax = subtotal * VAT;
  const total = subtotal + tax;

  const validate = () => {
    const newErrors: string[] = [];

    if (!companyName.trim()) {
      newErrors.push("Company name is required");
    }

    if (!companyEmail.trim()) {
      newErrors.push("Company email is required");
    }

    if (!clientName.trim()) {
      newErrors.push("Client name is required");
    }

    if (!clientEmail.trim()) {
      newErrors.push("Client email is required");
    }

    items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors.push(`Item ${index + 1}: Name required`);
      }

      if (item.qty <= 0) {
        newErrors.push(`Item ${index + 1}: Quantity must be > 0`);
      }

      if (item.price < 0) {
        newErrors.push(`Item ${index + 1}: Price cannot be negative`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    alert("Invoice Generated Successfully!");
  };

  const isValid =
    companyName.trim() &&
    companyEmail.trim() &&
    clientName.trim() &&
    clientEmail.trim() &&
    items.every(
      (i) => i.name.trim() && i.qty > 0 && i.price >= 0
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-10">
          <h1 className="text-4xl font-bold mb-2">
            Create Invoice
          </h1>

          <p className="text-gray-500 mb-10">
            Generate professional invoices
          </p>

          {/* Company */}
          <section className="mb-10">

            <h2 className="text-xl font-semibold mb-4">
              Company Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Company Name"
              />

              <input
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Company Email"
              />
            </div>
          </section>

          {/* Client */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Client Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Client Name"
              />

              <input
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="border rounded-lg p-3"
                placeholder="Client Email"
              />
            </div>
          </section>

          {/* Items */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Invoice Items
            </h2>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_120px_120px_48px] gap-4">
                  <input
                    value={item.name}
                    onChange={(e) =>
                      updateItem(index, "name", e.target.value)
                    }
                    className="border rounded-lg p-3"
                    placeholder="Item"
                  />

                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      updateItem(index, "qty", Number(e.target.value))
                    }
                    className="border rounded-lg p-3"
                    placeholder="Qty"
                  />

                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(index, "price", Number(e.target.value))
                    }
                    className="border rounded-lg p-3"
                    placeholder="Price"
                  />

                  {items.length > 1 && index === items.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="group flex items-center justify-center"
                    >
                      <div className="w-6 h-6 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center group-hover:bg-green-50 transition">
                        <X size={14} strokeWidth={3} />
                      </div>
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>

            <div className="border-b border-gray-200 pb-8 mb-8 mt-4">
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-3 text-green-600 hover:text-green-700 group"
              >
                <PlusCircle
                  size={24}
                  className="transition group-hover:scale-110"
                />

                <span className="underline group-hover:no-underline">
                  Add a line item
                </span>
              </button>
            </div>

            {errors.length > 0 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                {errors.map((err, i) => (
                  <p key={i} className="text-red-600 text-sm">
                    • {err}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-10 border-t pt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (24%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`mt-8 w-full py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2
    ${isValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {!isValid && <AlertCircle size={18} />}
              Generate Invoice
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
