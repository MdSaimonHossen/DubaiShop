import { NextResponse } from 'next/server';
import { getAllSections, updateSection } from '@/lib/db';

export async function GET() {
  try {
    const sections = await getAllSections();
    return NextResponse.json({ sections });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...partial } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Section ID is required' }, { status: 400 });
    }
    const updated = await updateSection(id, partial);
    return NextResponse.json({ success: true, section: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
