import { NextResponse } from 'next/server';
import { getRequests, createServiceRequest } from '@/lib/db';

export async function GET() {
  try {
    const requests = await getRequests();
    return NextResponse.json({ requests });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.customerPhone) {
      return NextResponse.json({ error: 'Customer name and phone are required' }, { status: 400 });
    }

    const newRequest = await createServiceRequest({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerWhatsapp: body.customerWhatsapp,
      vehicleBrand: body.vehicleBrand || 'Unknown',
      vehicleModel: body.vehicleModel || 'Unknown',
      vehicleYear: body.vehicleYear || '',
      serviceRequired: body.serviceRequired || 'Car Battery Replacement',
      locationArea: body.locationArea || 'Dubai',
      specificLocation: body.specificLocation || '',
      issueDescription: body.issueDescription || '',
      urgency: body.urgency || 'EMERGENCY_NOW',
      source: body.source || 'WEBSITE_EMERGENCY'
    });

    return NextResponse.json({ success: true, request: newRequest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
