import { NextRequest, NextResponse } from 'next/server';
import { deleteCategory } from '@/lib/models/Category';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = await deleteCategory(id);
    if (success) {
      return NextResponse.json({ message: 'Category deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
  }
}
