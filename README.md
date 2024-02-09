## MyBRO Demo

## Getting Started

Install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Add a `.env` file in the root of the project with the following content:

```env
SNOMED_API_URL = your_snomed_api_url
ICD10_API_URL = your_icd10_api_url
API_KEY = your_api_key
```

Then, run the development server:

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

## Deploy on Vercel

The easiest way to deploy MyBro Demo is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
