This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

ReactSphere is an organization-join portal that lets people request membership to the GitHub organization via their GitHub username.

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
ORG_NAME=ReactSphere
```

### Required GitHub Token Permissions

The `GITHUB_TOKEN` must satisfy **both** of the following requirements:

1. **The token owner must be an owner (admin) of the GitHub organization.**  
   Regular members cannot send org invitations. Go to `https://github.com/orgs/<ORG_NAME>/people` and confirm the account is listed as *Owner*.

2. **The token must have the `write:org` scope** (included in `admin:org`).  
   Generate or update your token at <https://github.com/settings/tokens> and enable:
   - **`admin:org`** → `write:org` (minimum required)

If the token is missing either of these, the API returns `403 You must be an admin to create an invitation to an organization.`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
