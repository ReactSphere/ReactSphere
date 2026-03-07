import { NextRequest, NextResponse } from 'next/server';

async function getUserId(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('GitHub user not found');
  const data = await res.json();
  return data.id;
}

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  if (!username) return NextResponse.json({ message: 'Username is required' }, { status: 400 });

  try {
    const userId = await getUserId(username);
    const org = process.env.ORG_NAME;
    const token = process.env.GITHUB_TOKEN;

    const res = await fetch(`https://api.github.com/orgs/${org}/invitations`, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invitee_id: userId }),
    });

    if (res.status === 201) {
      return NextResponse.json({ message: 'Invitation sent!' });
    } else {
      const errorData = await res.json();
      return NextResponse.json({ message: JSON.stringify(errorData) }, { status: res.status });
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}