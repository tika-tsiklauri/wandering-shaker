"use client";

import { useState } from "react";
import { Toast, useToast } from "./Toast";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear toast when user starts typing again
    if (toast) {
      hideToast();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      showToast("Thanks — we got your message and will reply shortly.", "success");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again or email us directly.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={hideToast}
        />
      )}
      <section className="w-full bg-[#f8f5ef] py-16">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Left: form */}
            <div>
              <h1 className="font-primary text-3xl md:text-4xl text-[#354f32]">
                Contact
              </h1>
              <p className="mt-3 font-secondary text-sm md:text-base text-[#354f32]/80 max-w-md">
                Quick question or a special request? Send a note and we&apos;ll get
                back to you soon.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 rounded-xl border border-[#c7b8a2]/60 bg-[#f8f5ef] p-6 md:p-8 shadow-sm"
              >
                <div className="grid gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="font-secondary text-sm rounded-md bg-[#354f32] text-[#f8f5ef] px-6 py-2.5 hover:bg-[#2f452c] disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {submitting ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: contact info card */}
            <div className="md:pt-16">
              <div className="rounded-xl border border-[#c7b8a2]/60 bg-[#e9e2d0]/35 p-6 md:p-8 shadow-sm">
                <h2 className="font-primary text-2xl text-[#354f32]">
                  Contact Info
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Email
                    </p>
                    <a
                      className="font-secondary text-sm text-[#354f32] underline underline-offset-4 hover:opacity-80"
                      href="mailto:events@wandering-shaker.com"
                    >
                      events@wandering-shaker.com
                    </a>
                  </div>

                  <div>
                    <p className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Phone
                    </p>
                    <a
                      className="font-secondary text-sm text-[#354f32] underline underline-offset-4 hover:opacity-80"
                      href="tel:+18458257408"
                    >
                      (845) 825-7408
                    </a>
                  </div>

                  <div>
                    <p className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Service area
                    </p>
                    <p className="font-secondary text-sm text-[#354f32]/90">
                      NY + NJ + CT
                    </p>
                  </div>

                  <div>
                    <p className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                      Instagram
                    </p>
                    <a
                      className="font-secondary text-sm text-[#354f32] underline underline-offset-4 hover:opacity-80"
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @wandering_shaker
                    </a>
                  </div>
                </div>

                <p className="mt-6 font-secondary text-xs text-[#354f32]/70">
                  Prefer email? Send details like date, location, guest count, and
                  the vibe you&apos;re going for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}