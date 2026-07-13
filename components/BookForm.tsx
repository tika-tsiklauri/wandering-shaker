"use client";

import { useState } from "react";
import FormSelect, { type FormSelectOption } from "./FormSelect";
import { Toast, useToast } from "./Toast";

type FormState = {
  name: string;
  email: string;
  eventDate: string;
  eventType: string;
  location: string;
  guestCount: string;
  serviceDuration: string;
  beverageService: string;
  otherBeverageService: string;
  barSetup: string;
  message: string;
};

type SelectFieldName =
  | "eventType"
  | "serviceDuration"
  | "beverageService"
  | "barSetup";

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  eventDate: "",
  eventType: "",
  location: "",
  guestCount: "",
  serviceDuration: "",
  beverageService: "",
  otherBeverageService: "",
  barSetup: "",
  message: "",
};

const MIN_LEAD_DAYS = 14;

const eventTypeOptions: FormSelectOption[] = [
  {
    value: "wedding",
    label: "Wedding",
  },
  {
    value: "private-gathering",
    label: "Private gathering",
  },
  {
    value: "birthday",
    label: "Birthday",
  },
  {
    value: "shower",
    label: "Shower",
  },
  {
    value: "fundraiser",
    label: "Fundraiser",
  },
  {
    value: "corporate",
    label: "Corporate event",
  },
  {
    value: "brand-event",
    label: "Brand or launch event",
  },
  {
    value: "other",
    label: "Other",
  },
];

const durationOptions: FormSelectOption[] = [
  {
    value: "2-hours",
    label: "2 hours",
  },
  {
    value: "3-hours",
    label: "3 hours",
  },
  {
    value: "4-hours",
    label: "4 hours",
  },
  {
    value: "5-plus-hours",
    label: "5+ hours",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
  },
];

const beverageServiceOptions: FormSelectOption[] = [
  {
    value: "signature-cocktails",
    label: "Signature cocktails",
  },
  {
    value: "full-cocktail-menu",
    label: "Full cocktail menu",
  },
  {
    value: "beer-and-wine",
    label: "Beer & wine",
  },
  {
    value: "simple-mixers",
    label: "Simple liquor + mixer drinks (vodka soda, gin and tonic, whiskey ginger, etc.)",
  },
  {
    value: "mocktails",
    label: "Mocktails",
  },
  {
    value: "other",
    label: "Other beverage service",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
  },
];

const barSetupOptions: FormSelectOption[] = [
  {
    value: "existing-bar",
    label: "There is an existing bar or suitable serving space",
  },
  {
    value: "portable-bar",
    label: "We'd like Wandering Shaker to provide the portable bar",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
  },
];

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
  if (!value.trim()) {
    return "Event date is required.";
  }

  const parsed = parseIsoDate(value);

  if (!parsed) {
    return "Select a valid date from the calendar.";
  }

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  const minEventDate = (() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + MIN_LEAD_DAYS);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  })();

  const clearFieldError = (name: keyof FormState) => {
    setErrors((previous) => {
      if (!previous[name]) return previous;

      const nextErrors = { ...previous };
      delete nextErrors[name];

      return nextErrors;
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormState;

    setForm((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    clearFieldError(fieldName);

    if (toast) {
      hideToast();
    }

    if (fieldName === "eventDate") {
      const dateError = validateEventDate(value);

      setErrors((previous) => ({
        ...previous,
        eventDate: dateError ?? undefined,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    const fieldName = name as SelectFieldName;

    setForm((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    clearFieldError(fieldName);

    if (toast) {
      hideToast();
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    }

    const dateError = validateEventDate(form.eventDate);

    if (dateError) {
      nextErrors.eventDate = dateError;
    }

    if (!form.eventType) {
      nextErrors.eventType = "Please select an occasion.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Please enter the event location.";
    }

    if (!form.guestCount.trim()) {
      nextErrors.guestCount = "Please enter an approximate guest count.";
    }

    if (form.guestCount && Number(form.guestCount) < 1) {
      nextErrors.guestCount = "Guest count must be at least 1.";
    }

    if (!form.serviceDuration) {
      nextErrors.serviceDuration = "Please select a service duration.";
    }

    if (!form.beverageService) {
      nextErrors.beverageService = "Please select a beverage service.";
    }
    if (form.beverageService === "other" && !form.otherBeverageService.trim()) {
      nextErrors.otherBeverageService =
        "Please tell us what type of beverage service you have in mind.";
    }

    if (!form.barSetup) {
      nextErrors.barSetup = "Please select the available bar setup.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      requestAnimationFrame(() => {
        const firstInvalidElement = document.querySelector<HTMLElement>(
          '[aria-invalid="true"], input:invalid',
        );

        firstInvalidElement?.focus();
      });

      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);

        if (payload?.error && typeof payload.error === "string") {
          throw new Error(payload.error);
        }

        throw new Error("Request failed.");
      }

      showToast(
        "Thank you! We've received your inquiry and will be in touch soon.",
        "success",
      );

      setForm(initialState);
      setErrors({});
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly.";

      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName =
    "font-secondary text-base text-[#354f32] rounded-md border border-[#c7b8a2]/70 bg-white/70 px-3 py-2 outline-none placeholder:text-[#354f32]/45 focus:placeholder:text-transparent focus:border-[#354f32] focus:ring-1 focus:ring-[#354f32]/60";

  const errorInputClassName =
    "border-red-700/70 focus:border-red-700 focus:ring-red-700/40";

  const labelClassName =
    "font-secondary text-sm leading-snug text-[#354f32]/75";

  const errorTextClassName = "mt-1 font-secondary text-xs text-red-700";

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={hideToast}
        />
      )}

      <section className="w-full bg-[#f8f5ef] py-18">
        <div className="mx-auto max-w-3xl px-6 py-18">
          <p className="mt-3 max-w-xl font-secondary text-sm text-[#354f32]/80 md:text-base">
            Tell us a little about your gathering and we&apos;ll follow up with
            availability, pricing, and a bar experience tailored to your event.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 rounded-xl border border-[#c7b8a2]/60 bg-[#f8f5ef] p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className={labelClassName}>
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputClassName} ${
                    errors.name ? errorInputClassName : ""
                  }`}
                />

                {errors.name && (
                  <p id="name-error" className={errorTextClassName}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className={labelClassName}>
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputClassName} ${
                    errors.email ? errorInputClassName : ""
                  }`}
                />

                {errors.email && (
                  <p id="email-error" className={errorTextClassName}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="eventDate" className={labelClassName}>
                  When is your gathering?
                </label>

                <input
                  id="eventDate"
                  type="date"
                  name="eventDate"
                  min={minEventDate}
                  value={form.eventDate}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.eventDate)}
                  aria-describedby={
                    errors.eventDate ? "event-date-error" : undefined
                  }
                  onClick={(event) => {
                    try {
                      event.currentTarget.showPicker?.();
                    } catch {
                      // Unsupported by some browsers.
                    }
                  }}
                  className={`${inputClassName} cursor-pointer select-none caret-transparent ${
                    errors.eventDate ? errorInputClassName : ""
                  }`}
                />

                {errors.eventDate && (
                  <p id="event-date-error" className={errorTextClassName}>
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <FormSelect
                name="eventType"
                label="What's the occasion?"
                placeholder="Select an occasion"
                value={form.eventType}
                options={eventTypeOptions}
                onChange={handleSelectChange}
                required
                error={errors.eventType}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="location" className={labelClassName}>
                  Where will the event be held?
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Venue name, town, or address"
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={
                    errors.location ? "location-error" : undefined
                  }
                  className={`${inputClassName} ${
                    errors.location ? errorInputClassName : ""
                  }`}
                />

                {errors.location && (
                  <p id="location-error" className={errorTextClassName}>
                    {errors.location}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="guestCount" className={labelClassName}>
                  How many guests are you expecting?
                </label>

                <input
                  id="guestCount"
                  type="number"
                  name="guestCount"
                  min={1}
                  inputMode="numeric"
                  value={form.guestCount}
                  onChange={handleChange}
                  placeholder="Approximate guest count"
                  aria-invalid={Boolean(errors.guestCount)}
                  aria-describedby={
                    errors.guestCount ? "guest-count-error" : undefined
                  }
                  className={`${inputClassName} ${
                    errors.guestCount ? errorInputClassName : ""
                  }`}
                />

                {errors.guestCount && (
                  <p id="guest-count-error" className={errorTextClassName}>
                    {errors.guestCount}
                  </p>
                )}
              </div>

              <FormSelect
                name="serviceDuration"
                label="Approximately how many hours of bar service are you envisioning?"
                placeholder="Select a duration"
                value={form.serviceDuration}
                options={durationOptions}
                onChange={handleSelectChange}
                required
                error={errors.serviceDuration}
              />

              <FormSelect
                name="beverageService"
                label="What type of beverage service are you interested in?"
                placeholder="Select a service style"
                value={form.beverageService}
                options={beverageServiceOptions}
                onChange={handleSelectChange}
                required
                error={errors.beverageService}
              />
              {form.beverageService === "other" && (
                <div className="flex flex-col gap-1 border-l-2 border-[#c7b8a2]/70 pl-4 md:col-start-2 md:ml-3">
                  <p className="font-secondary text-xs text-[#354f32]/55">
                    Since you selected Other beverage service:
                  </p>

                  <label
                    htmlFor="otherBeverageService"
                    className={labelClassName}
                  >
                    Tell us what type of beverage service you have in mind
                  </label>

                  <input
                    id="otherBeverageService"
                    type="text"
                    name="otherBeverageService"
                    value={form.otherBeverageService}
                    onChange={handleChange}
                    placeholder="Tell us more"
                    aria-invalid={Boolean(errors.otherBeverageService)}
                    aria-describedby={
                      errors.otherBeverageService
                        ? "other-beverage-service-error"
                        : undefined
                    }
                    className={`${inputClassName} ${
                      errors.otherBeverageService ? errorInputClassName : ""
                    }`}
                  />

                  {errors.otherBeverageService && (
                    <p
                      id="other-beverage-service-error"
                      className={errorTextClassName}
                    >
                      {errors.otherBeverageService}
                    </p>
                  )}
                </div>
              )}

              <FormSelect
                name="barSetup"
                label="Tell us about the venue"
                placeholder="Select the available setup"
                value={form.barSetup}
                options={barSetupOptions}
                onChange={handleSelectChange}
                helperText="Will there be an existing bar or suitable serving space, such as a kitchen island, with access to running water, or should we plan to bring our portable bar?"
                required
                fullWidth
                error={errors.barSetup}
              />
            </div>

            <div className="mt-5 flex flex-col gap-1">
              <label htmlFor="message" className={labelClassName}>
                Is there anything else you&apos;d like us to know about your
                gathering or the atmosphere you&apos;re hoping to create?
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Share any details about your vision, date flexibility, venue, beverage ideas, or anything else that may help us understand your gathering."
              />

              <p className="font-secondary text-xs text-[#354f32]/60">
                Optional
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-[#354f32] px-6 py-2.5 font-secondary text-sm text-[#f8f5ef] transition hover:bg-[#2f452c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request Proposal"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
