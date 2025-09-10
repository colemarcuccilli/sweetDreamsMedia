import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        status: 'warning',
        message: 'Supabase environment variables not configured',
        timestamp: new Date().toISOString()
      })
    }

    // Dynamically import Supabase only when env vars are available
    const { supabase } = await import('@/lib/supabase')
    
    // Test Supabase connection
    const { data, error } = await supabase
      .from('projects')
      .select('count')
      .limit(1)
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "table not found" which is expected
      throw error
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Next.js and Supabase connection working!',
      supabase_connected: !error,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}