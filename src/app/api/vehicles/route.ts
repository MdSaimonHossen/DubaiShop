import { NextResponse } from 'next/server';
import { getVehicleBrands, saveVehicleBrand, deleteVehicleBrand } from '@/lib/db';

export async function GET() {
  try {
    const vehicles = await getVehicleBrands(false);
    return NextResponse.json({ vehicles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Vehicle brand name is required' }, { status: 400 });
    }
    const saved = await saveVehicleBrand(body);
    return NextResponse.json({ success: true, vehicle: saved });
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
    const success = await deleteVehicleBrand(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
