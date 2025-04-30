import { NextRequest, NextResponse } from "next/server";

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