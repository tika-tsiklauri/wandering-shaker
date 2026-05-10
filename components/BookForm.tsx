"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  eventDate: string;
  eventType: string;
  location: string;
  guestCount: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  eventDate: "",
  eventType: "",
  location: "",
  guestCount: "",
  message: "",
};

export default function BookForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess("Thank you! We’ve received your inquiry and will be in touch soon.");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#f8f5ef] py-18">
      <div className="max-w-3xl mx-auto px-6 py-18">
        {/* <h1 className="font-primary text-3xl md:text-4xl text-[#354f32]">
          Book Us
        </h1> */}
        <p className="mt-3 font-secondary text-sm md:text-base text-[#354f32]/80 max-w-xl">
          Tell us a little about your event and we’ll follow up with availability,
          pricing, and a tailored bar experience.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-[#c7b8a2]/60 bg-[#f8f5ef] p-6 md:p-8 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
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
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
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
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                Event date
              </label>
              <input
                type="date"
                name="eventDate"
                required
                value={form.eventDate}
                onChange={handleChange}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                Event type
              </label>
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              >
                <option value="">Select type</option>
                <option value="wedding">Wedding</option>
                <option value="private-party">Private party</option>
                <option value="corporate">Corporate event</option>
                <option value="brand-event">Brand / launch</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                Location / venue
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                Guest count (approx.)
              </label>
              <input
                type="number"
                name="guestCount"
                min={1}
                value={form.guestCount}
                onChange={handleChange}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
              Tell us about your event
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              placeholder="Date flexibility, bar style, cocktails you love, anything we should know…"
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="font-secondary text-sm rounded-md bg-[#354f32] text-[#f8f5ef] px-6 py-2.5 hover:bg-[#2f452c] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Sending…" : "Send inquiry"}
            </button>

            {success && (
              <p className="font-secondary text-xs text-[#354f32]/80 max-w-xs">
                {success}
              </p>
            )}
            {error && (
              <p className="font-secondary text-xs text-red-700 max-w-xs">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
