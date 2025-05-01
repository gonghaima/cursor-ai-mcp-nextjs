import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Here you would typically:
    // 1. Validate the email
    // 2. Store it in a database
    // 3. Send a confirmation email
    // For now, we'll just simulate success
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }
    
    // In a real implementation, you would add email to your database
    console.log(`Waitlist signup: ${email}`);
    
    // Send email to ymail inbox using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.RESEND_RECEIVER_EMAIL;
    if (!resendApiKey || !receiverEmail) {
      return NextResponse.json(
        { success: false, message: "Server email configuration error" },
        { status: 500 }
      );
    }
    const resend = new Resend(resendApiKey);
    const { error: resendError } = await resend.emails.send({
      from: 'Levercast Waitlist <onboarding@resend.dev>',
      to: receiverEmail,
      subject: 'New Waitlist Signup',
      html: `<p>New waitlist signup: <strong>${email}</strong></p>`
    });
    if (resendError) {
      return NextResponse.json(
        { success: false, message: "Failed to send notification email" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for joining our waitlist! We'll notify you when we launch." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
} 