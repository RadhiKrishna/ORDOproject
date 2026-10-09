"use client";

import { useState } from "react";
import { serviceOptions, site } from "@/lib/site-data";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    // Spam protection: silent return if honeypot is filled
    if (form.get("botcheck")) {
      return;
    }

    const name = String(form.get("name") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Website enquiry from ${name || "a visitor"}`,
          from_name: "ORDO Website",
          name,
          company,
          email,
          phone,
          service,
          message,
          replyto: email,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        formElement.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-gold/40 bg-cloud2 p-8 text-center"
      >
        <p className="font-display text-xl text-slate">
          Thank you &mdash; message sent.
        </p>
        <p className="text-slate2 text-sm mt-2">
          We have received your enquiry and will get back to you shortly.
        </p>
        {site.phone && (
          <p className="text-slate2 text-xs mt-4 pt-4 border-t border-line2">
            For urgent matters, call us directly at{" "}
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="text-gold hover:text-gold2 font-medium"
            >
              {site.phone}
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-medium">
            Something went wrong sending your message.
          </p>
          <p className="mt-1 text-xs text-red-700">
            Please try again or email us directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline font-semibold hover:text-red-950"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" autoComplete="name" required />
        <Field label="Company" name="company" autoComplete="organization" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-mono text-slate2 uppercase tracking-wide mb-2">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          className="w-full bg-cloud2 border border-line2 rounded-md px-4 py-3 text-sm text-slate focus-ring transition-colors"
        >
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-slate2 uppercase tracking-wide mb-2">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={5}
          className="w-full bg-cloud2 border border-line2 rounded-md px-4 py-3 text-sm text-slate placeholder:text-slate2/60 focus-ring resize-none transition-colors"
          placeholder="Tell us about your project or requirement..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 bg-ink text-cloud font-medium text-sm rounded-md px-7 py-3.5 hover:bg-panel transition-all duration-200 focus-ring shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-mono text-slate2 uppercase tracking-wide mb-2">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        aria-required={required ? "true" : undefined}
        className="w-full bg-cloud2 border border-line2 rounded-md px-4 py-3 text-sm text-slate placeholder:text-slate2/60 focus-ring transition-colors"
      />
    </div>
  );
}
