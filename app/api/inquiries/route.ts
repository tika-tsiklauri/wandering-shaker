import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
