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

const MIN_LEAD_DAYS = 14;

function parseIsoDate(input: string): Date | null {
  const match = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function validateEventDate(value: string): string | null {
  if (!value.trim()) return "Event date is required.";

  const parsed = parseIsoDate(value);
  if (!parsed) return "Select a valid date from the calendar.";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + MIN_LEAD_DAYS);

  if (parsed < minDate) {
    return "Event date must be at least 2 weeks from today.";
  }

  return null;
}

export default function BookForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [eventTypeFocused, setEventTypeFocused] = useState(false);
  const [eventDateError, setEventDateError] = useState<string | null>(null);

  const minEventDate = (() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + MIN_LEAD_DAYS);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "eventDate") {
      setEventDateError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    const dateValidationError = validateEventDate(form.eventDate);
    if (dateValidationError) {
      setEventDateError(dateValidationError);
      setSubmitting(false);
      return;
    }

    setEventDateError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        if (payload?.error && typeof payload.error === "string") {
          throw new Error(payload.error);
        }
        throw new Error("Request failed");
      }

      setSuccess("Thank you! We’ve received your inquiry and will be in touch soon.");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly.";
      setError(message);
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
          Tell us a little about your event and we’ll follow up with
          availability, pricing, and a tailored bar experience.
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
                Event date
              </label>
              <input
                type="date"
                name="eventDate"
                required
                min={minEventDate}
                value={form.eventDate}
                onChange={handleChange}
                onPointerDown={(e) => {
                  e.preventDefault();
                  try {
                    e.currentTarget.showPicker?.();
                  } catch {
                    // Ignore browsers that block or don't support showPicker.
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") return;

                  if (
                    e.key === "Enter" ||
                    e.key === " " ||
                    e.key === "ArrowDown"
                  ) {
                    e.preventDefault();
                    try {
                      e.currentTarget.showPicker?.();
                    } catch {
                      // Ignore browsers that block or don't support showPicker.
                    }
                    return;
                  }

                  e.preventDefault();
                }}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none caret-transparent select-none cursor-pointer focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              />
              {eventDateError && (
                <p className="mt-1 font-secondary text-xs text-red-700">
                  {eventDateError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-secondary text-xs uppercase tracking-wide text-[#354f32]/70">
                Event type
              </label>
              <select
                name="eventType"
                value={form.eventType}
                required
                onChange={handleChange}
                onFocus={() => setEventTypeFocused(true)}
                onBlur={() => setEventTypeFocused(false)}
                className={`font-secondary text-base rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60 ${
                  form.eventType
                    ? "text-[#354f32]"
                    : eventTypeFocused
                      ? "text-transparent"
                      : "text-[#354f32]/45"
                }`}
              >
                <option value="">Select type</option>
                <option value="wedding">Wedding</option>
                <option value="private-party">Private gathering</option>
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
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
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
                required
                value={form.guestCount}
                onChange={handleChange}
                className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/60 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
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
              className="font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/25 focus:placeholder-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60"
              placeholder="Date flexibility, bar style, cocktails you love, anything we should know…"
            />
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="font-secondary text-sm rounded-md bg-[#354f32] text-[#f8f5ef] px-6 py-2.5 hover:bg-[#2f452c] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Sending…" : "Send inquiry"}
            </button>

            {success && (
              <p className="font-secondary text-xs text-[#354f32]/80 max-w-xs md:max-w-sm">
                {success}
              </p>
            )}
            {error && (
              <p className="font-secondary text-xs text-red-700 max-w-xs md:max-w-sm">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
