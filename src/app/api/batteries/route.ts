import { NextResponse } from 'next/server';
import { getBatteryProducts, saveBatteryProduct, deleteBatteryProduct } from '@/lib/db';

export async function GET() {
  try {
    const batteries = await getBatteryProducts(false);
    return NextResponse.json({ batteries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.brandName || !body.modelNumber) {
      return NextResponse.json({ error: 'Brand name and model number are required' }, { status: 400 });
    }
    const saved = await saveBatteryProduct(body);
    return NextResponse.json({ success: true, battery: saved });
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
    const success = await deleteBatteryProduct(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
