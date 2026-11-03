import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // Server-side audit log for inbound compliance/editorial inquiries
    console.info(`[ContactForm] New message from ${name.trim()} <${email.trim()}> | Subject: ${subject || "General"}`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. Your message has been received by the SmartGearPicks team.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ContactAPI] Error processing message:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

