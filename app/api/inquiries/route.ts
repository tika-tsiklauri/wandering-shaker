import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MIN_LEAD_DAYS = 14;

const eventTypeLabels: Record<string, string> = {
  wedding: "Wedding",
  "private-gathering": "Private gathering",
  birthday: "Birthday",
  shower: "Shower",
  fundraiser: "Fundraiser",
  corporate: "Corporate event",
  "brand-event": "Brand or launch event",
  other: "Other",
};

const serviceDurationLabels: Record<string, string> = {
  "2-hours": "2 hours",
  "3-hours": "3 hours",
  "4-hours": "4 hours",
  "5-plus-hours": "5+ hours",
  "not-sure": "Not sure yet",
};

const beverageServiceLabels: Record<string, string> = {
  "beer-and-wine": "Beer & wine",
  "simple-mixers":
    "Simple liquor + mixer drinks (vodka soda, gin and tonic, whiskey ginger, etc.)",
  "signature-cocktails": "Signature cocktails",
  "full-cocktail-menu": "Full cocktail menu",
  mocktails: "Mocktails",
  other: "Other beverage service",
  "not-sure": "Not sure yet",
};

const barSetupLabels: Record<string, string> = {
  "existing-bar": "There is an existing bar or suitable serving space",
  "portable-bar": "We'd like Wandering Shaker to provide the portable bar",
  "not-sure": "Not sure yet",
};

function formatSelectValue(
  value: unknown,
  labels: Record<string, string>,
): string {
  if (typeof value !== "string" || !value.trim()) return "-";

  return labels[value] ?? value;
}

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

function validateEventDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return "Event date is required.";
  }

  const parsed = parseIsoDate(value.trim());
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

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      eventDate,
      eventType,
      location,
      guestCount,
      serviceDuration,
      beverageService,
      otherBeverageService,
      barSetup,
      message,
    } = data;

    const eventDateError = validateEventDate(eventDate);
    if (eventDateError) {
      return new Response(
        JSON.stringify({ success: false, error: eventDateError }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build a nice plain-text body
    const textBody = `
New booking inquiry from ${name || "Unknown"}:

Name:        ${name || "-"}
Email:       ${email || "-"}
Event Date:  ${eventDate || "-"}
Event Type:  ${formatSelectValue(eventType, eventTypeLabels)}
Location:    ${location || "-"}
Guests:      ${guestCount || "-"}

Service Duration:       ${formatSelectValue(serviceDuration, serviceDurationLabels)}
Beverage Service:       ${formatSelectValue(beverageService, beverageServiceLabels)}
Other Beverage Service: ${otherBeverageService || "-"}
Bar Setup:              ${formatSelectValue(barSetup, barSetupLabels)}

Message:
${message || "-"}
`.trim();

    // Send email via Resend
    const result = await resend.emails.send({
      from:
        process.env.BOOKING_FROM_EMAIL ||
        "bookings@example.com", // fallback; replace with your domain later
      to: [process.env.BOOKING_RECEIVER_EMAIL || "you@example.com"],
      subject: `New booking inquiry${name ? ` from ${name}` : ""}`,
      text: textBody,
      // Optionally also send HTML version:
      html: textBody.replace(/\n/g, "<br />"),
      replyTo: email || undefined,
    });

    console.log("Resend result:", result);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error handling booking request:", err);
    return new Response(
      JSON.stringify({ success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
