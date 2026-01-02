import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const TEAMS_PATH = path.join(process.cwd(), 'data', 'teams.json');

export async function GET() {
    const data = await fs.readFile(TEAMS_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
    const team = await request.json();
    const data = await fs.readFile(TEAMS_PATH, 'utf-8');
    const teams = JSON.parse(data);

    const index = teams.findIndex((t: any) => t.id === team.id);
    if (index > -1) {
        teams[index] = { ...teams[index], ...team };
    } else {
        teams.push(team);
    }

    await fs.writeFile(TEAMS_PATH, JSON.stringify(teams, null, 4));
    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const data = await fs.readFile(TEAMS_PATH, 'utf-8');
    const teams = JSON.parse(data);

    const filteredTeams = teams.filter((t: any) => t.id !== id);
    await fs.writeFile(TEAMS_PATH, JSON.stringify(filteredTeams, null, 4));
    return NextResponse.json({ success: true });
}
