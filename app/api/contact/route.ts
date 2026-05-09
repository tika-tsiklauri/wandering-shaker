import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const textBody = `
New contact message:

Name: ${name || "-"}
Email: ${email || "-"}

Message:
${message || "-"}
`.trim();

    await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev",
      to: [process.env.BOOKING_RECEIVER_EMAIL || "you@example.com"],
      subject: `New contact message${name ? ` from ${name}` : ""}`,
      text: textBody,
      html: textBody.replace(/\n/g, "<br />"),
      replyTo: email || undefined,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact route error:", err);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
