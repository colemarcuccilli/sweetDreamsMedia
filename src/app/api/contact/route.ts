import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, projectType, message } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      })
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, '') // Remove any spaces from app password
      }
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jayvalleo@sweetdreamsmusic.com',
      subject: `🔥 NEW LEAD: ${projectType.toUpperCase()} Project - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #fff; padding: 20px; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #DAA520, #FFD700); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #000; margin: 0; text-align: center;">🎬 NEW PROJECT INQUIRY</h1>
          </div>
          
          <div style="background-color: #222; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h2 style="color: #DAA520; margin-top: 0;">📞 PRIORITY: CALL THIS LEAD</h2>
            <div style="background-color: #DAA520; color: #000; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center;">
              📱 PHONE: ${phone}
            </div>
          </div>
          
          <div style="background-color: #222; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #DAA520; margin-top: 0;">👤 Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #222; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #DAA520; margin-top: 0;">🎯 Project Information</h3>
            <p><strong>Project Type:</strong> <span style="color: #DAA520; text-transform: capitalize;">${projectType}</span></p>
            ${message ? `<p><strong>Project Details:</strong></p><div style="background-color: #333; padding: 15px; border-radius: 5px; border-left: 4px solid #DAA520;">${message}</div>` : ''}
          </div>
          
          <div style="background-color: #1a472a; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e;">
            <p style="margin: 0; color: #86efac;">
              <strong>💡 Action Required:</strong> Call ${name} at ${phone} within 24 hours while they're still hot!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
            <p style="color: #888; font-size: 12px;">
              Sent from Sweet Dreams Music Portfolio Contact Form<br>
              ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    // More detailed error response for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Detailed error:', errorMessage)
    
    return NextResponse.json(
      { error: 'Failed to send email', details: errorMessage },
      { status: 500 }
    )
  }
}