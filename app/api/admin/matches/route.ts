import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const FIXTURES_PATH = path.join(process.cwd(), 'data', 'fixtures.json');

export async function GET() {
    const data = await fs.readFile(FIXTURES_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
    const fixture = await request.json();
    const data = await fs.readFile(FIXTURES_PATH, 'utf-8');
    const fixtures = JSON.parse(data);

    const index = fixtures.findIndex((f: any) => f.id === fixture.id);
    if (index > -1) {
        fixtures[index] = { ...fixtures[index], ...fixture };
    } else {
        fixtures.push(fixture);
    }

    await fs.writeFile(FIXTURES_PATH, JSON.stringify(fixtures, null, 4));
    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const data = await fs.readFile(FIXTURES_PATH, 'utf-8');
    const fixtures = JSON.parse(data);

    const filteredFixtures = fixtures.filter((f: any) => f.id !== id);
    await fs.writeFile(FIXTURES_PATH, JSON.stringify(filteredFixtures, null, 4));
    return NextResponse.json({ success: true });
}
