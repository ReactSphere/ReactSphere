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

  const org = process.env.ORG_NAME;
  const token = process.env.GITHUB_TOKEN;

  if (!token || !org) {
    return NextResponse.json(
      { message: 'Server configuration error: GITHUB_TOKEN or ORG_NAME is not set.' },
      { status: 500 }
    );
  }

  try {
    const userId = await getUserId(username);

    const res = await fetch(`https://api.github.com/orgs/${org}/invitations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invitee_id: userId }),
    });

    if (res.status === 201) {
      return NextResponse.json({ message: 'Invitation sent!' });
    }

    const errorData = await res.json();
    const errorMessage: string = errorData?.message ?? 'Unknown error from GitHub API';

    if (res.status === 403) {
      return NextResponse.json(
        {
          message:
            'Permission denied: the configured GitHub token does not have admin access to this organization. ' +
            'Ensure the token owner is an org owner and the token has the "write:org" scope (included in "admin:org").',
        },
        { status: 403 }
      );
    }

    if (res.status === 422) {
      return NextResponse.json(
        { message: `Unable to send invitation: ${errorMessage}` },
        { status: 422 }
      );
    }

    return NextResponse.json({ message: errorMessage }, { status: res.status });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}