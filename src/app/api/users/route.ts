// src/app/api/orders/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Orders GET endpoint working' });
}
