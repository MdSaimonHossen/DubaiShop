import { NextResponse } from 'next/server';
import { getDashboardMetrics, getEvents, logConversionEvent } from '@/lib/db';

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    const events = await getEvents();
    return NextResponse.json({ metrics, events: events.slice(0, 50) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const logged = await logConversionEvent({
      eventType: body.eventType || 'WHATSAPP_CLICK',
      pageUrl: body.pageUrl || '/',
      vehicleBrand: body.vehicleBrand,
      locationDistrict: body.locationDistrict,
      metadata: body.metadata
    });
    return NextResponse.json({ success: true, event: logged });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
