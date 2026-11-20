import { NextResponse } from 'next/server';
import { getServiceLocations, saveServiceLocation, deleteServiceLocation } from '@/lib/db';

export async function GET() {
  try {
    const locations = await getServiceLocations(false);
    return NextResponse.json({ locations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Location name is required' }, { status: 400 });
    }
    const saved = await saveServiceLocation(body);
    return NextResponse.json({ success: true, location: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteServiceLocation(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
