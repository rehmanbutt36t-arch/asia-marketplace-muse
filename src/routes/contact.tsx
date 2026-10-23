import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BR NOIR Luxury Perfumes" },
      {
        name: "description",
        content:
          "Get in touch with BR NOIR Luxury Perfumes — questions about orders, products or delivery, our team is here to help.",
      },
      { property: "og:title", content: "Contact — BR NOIR Luxury Perfumes" },
      {
        property: "og:description",
        content: "Get in touch with BR NOIR Luxury Perfumes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const inputCls =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Please enter a valid email";
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number";
    if (form.message.trim().length < 10) next.message = "Please write your message (at least 10 characters)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Message from ${form.name.trim()} — BR NOIR`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\nPhone: ${form.phone.trim()}\n\n${form.message.trim()}`,
    );
    window.location.href = `mailto:orders@brnoir.pk?subject=${subject}&body=${body}`;
    toast.success("Thank you! Your message is ready to send.", { position: "top-center" });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-medium">Contact</h1>
        <p className="mt-5 leading-relaxed text-foreground/90">
          Have a question about your order, our fragrances, or delivery? Fill in
          the form below and our team will get back to you as soon as possible —
          we aim to reply within 24 hours, seven days a week.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="mt-10 space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <User className="h-4 w-4 text-primary" /> Your Name
          </label>
          <input id="name" value={form.name} onChange={set("name")} placeholder="Full name" className={inputCls} />
          {errors.name && <p className="mt-1 text-xs text-sale">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <Mail className="h-4 w-4 text-primary" /> Email
          </label>
          <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
          {errors.email && <p className="mt-1 text-xs text-sale">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <Phone className="h-4 w-4 text-primary" /> Phone Number
          </label>
          <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="03XX-XXXXXXX" className={inputCls} />
          {errors.phone && <p className="mt-1 text-xs text-sale">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <MessageSquare className="h-4 w-4 text-primary" /> Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={set("message")}
            placeholder="Write your message here…"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.message && <p className="mt-1 text-xs text-sale">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-button px-4 py-3 text-sm font-medium text-button-foreground transition-colors hover:bg-button/90"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
