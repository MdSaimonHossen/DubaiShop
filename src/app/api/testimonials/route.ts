import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await getTestimonials(false);
    return NextResponse.json({ testimonials });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.reviewText) {
      return NextResponse.json({ error: 'Customer name and review text are required' }, { status: 400 });
    }
    const saved = await saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: saved });
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
    const success = await deleteTestimonial(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
