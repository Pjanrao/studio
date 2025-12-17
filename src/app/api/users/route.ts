
import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/models/User';

export async function GET(req: NextRequest) {
  try {
    const users = await getUsers();
    // Omit passwords from the response
    const usersWithoutPasswords = users.map(user => {
        const { password, ...rest } = user;
        return rest;
    });
    return NextResponse.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}
