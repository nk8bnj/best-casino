# Best Casino

A modern, high-performance casino platform built with Next.js, React, and TypeScript.

## Overview

Best Casino is a web-based casino application that provides an engaging gaming experience with a sleek, responsive interface. Built on the latest web technologies, it delivers fast performance and seamless user interactions.

## Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org) (App Router)
- **Frontend**: [React 19.2.3](https://react.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Font**: [Geist](https://vercel.com/font) (optimized via next/font)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **Package Manager**: npm, yarn, pnpm, or bun

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone git@github.com:nk8bnj/best-casino.git
cd best-casino
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will automatically reload when you make changes to the code.

### Building for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Running in Production

After building, start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
best-casino/
├── app/              # Next.js app directory (routes, layouts, pages)
├── assets/           # Image and media assets
├── components/       # React components
├── hooks/            # Custom React hooks
├── public/           # Static assets
├── services/         # API and business logic services
├── styles/           # Global styles and CSS modules
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
├── .next/            # Next.js build output (generated)
├── node_modules/     # Dependencies (generated)
└── package.json      # Project configuration
```
