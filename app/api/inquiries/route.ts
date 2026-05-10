import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
Event Type:  ${eventType || "-"}
Location:    ${location || "-"}
Guests:      ${guestCount || "-"}

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
