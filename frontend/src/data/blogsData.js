export const blogsData = [
  {
    id: 1,
    title: "Building a Type-Safe API with Prisma and Express",
    slug: "type-safe-api-prisma-express",
    excerpt:
      "A practical guide to combining Prisma's type safety with Express middleware for maintainable backend code.",
    category: "Backend",
    date: "2025-09-12",
    readTime: "8 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Building APIs in Node.js has historically meant sacrificing strict type safety at the database boundary. Developers write TypeScript interfaces for their models, only for those interfaces to drift out of sync with actual database schemas over time. Prisma changes this completely by generating client types directly from your database schema, giving you complete type safety from query to response.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Problem with Hand-Rolled Types",
      },
      {
        type: "paragraph",
        text: "When you manually declare types for your database records, several problems arise as your codebase scales:",
      },
      {
        type: "list",
        items: [
          "Manual sync: Whenever a column is renamed or its nullability changes, developers must remember to update multiple interface files.",
          "Partial query blindspots: Selecting a subset of fields still returns the broad entity type unless you write custom DTO types for every single query.",
          "Relation discrepancies: Joined relations (like user posts or tags) are often typed as optional, leading to excessive non-null assertions (!).",
        ],
      },
      {
        type: "quote",
        text: "Type safety is not about writing fewer bugs today; it is about refactoring with absolute confidence six months from now.",
      },
      {
        type: "heading",
        level: 2,
        text: "Defining Schema & Prisma Client Generation",
      },
      {
        type: "paragraph",
        text: "With Prisma, your database schema is the single source of truth. Here is an example of an expressive model setup:",
      },
      {
        type: "code",
        language: "prisma",
        code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  techStack   String[]
  liveUrl     String?
  repoUrl     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "Type-Safe Controller Handlers",
      },
      {
        type: "paragraph",
        text: "In Express with TypeScript, you can leverage Prisma's generated types directly in your async route controllers. Notice how TypeScript will autocomplete every single field on the resulting project object:",
      },
      {
        type: "code",
        language: "typescript",
        code: `import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        techStack: true,
        liveUrl: true,
      },
    });

    // projects is strictly typed to Array<{ id: string; title: string; techStack: string[]; liveUrl: string | null }>
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "Handling Prisma Known Errors Gracefully",
      },
      {
        type: "paragraph",
        text: "Prisma throws specific error instances like PrismaClientKnownRequestError with codes such as P2002 for unique constraint violations. A centralized error handling middleware can catch these cleanly:",
      },
      {
        type: "code",
        language: "typescript",
        code: `import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[])?.join(", ");
      return res.status(409).json({
        error: \`Unique constraint violation on \${target}\`,
      });
    }
  }

  console.error("Unhandled API error:", err);
  return res.status(500).json({ error: "Internal Server Error" });
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Combining Prisma with Express eliminates the ambiguity of API response shapes and database queries. If you change a column type in your database schema, running `npx prisma generate` immediately surfaces compile-time errors everywhere in your application that touches that field.",
      },
    ],
  },
  {
    id: 2,
    title: "React Server Components: A Mental Model",
    slug: "react-server-components-mental-model",
    excerpt:
      "Understanding where RSC fits, when to reach for it, and how it changes the way we think about data fetching.",
    category: "Frontend",
    date: "2025-08-28",
    readTime: "6 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "React Server Components (RSC) represent the biggest architectural shift in React since Hooks. Yet, much of the conversation around them is bogged down in framework jargon. Let's build a clear, foundational mental model of how RSC works and why it matters.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Client-Side Waterfall Dilemma",
      },
      {
        type: "paragraph",
        text: "Traditional Single Page Applications (SPAs) ship an empty HTML shell and a massive JavaScript bundle to the browser. The browser downloads the JS, runs it, renders the component tree, and then makes asynchronous fetch requests back to your server.",
      },
      {
        type: "list",
        items: [
          "Heavy bundle size: Markdown parsers, date formatters, and icons all end up in the client bundle.",
          "Network waterfalls: Parent components render and fetch, child components mount and fetch, causing sluggish loading spinners.",
          "Secret leakage risks: API keys and backend-only credentials cannot exist on the client side.",
        ],
      },
      {
        type: "quote",
        text: "Server Components are not SSR. Server-side rendering renders HTML strings. Server Components execute React code on the server and stream a structured component representation to the client without adding to the bundle.",
      },
      {
        type: "heading",
        level: 2,
        text: "Zero-Bundle-Size Dependencies",
      },
      {
        type: "paragraph",
        text: "Imagine you want to render syntax-highlighted code or parse markdown on a blog. In client components, a library like Highlight.js or Remark adds 40kb+ to your bundle. With Server Components, that entire library stays on the server:",
      },
      {
        type: "code",
        language: "jsx",
        code: `// This component runs ONLY on the server!
// Zero bytes of 'marked' are sent to the client browser.
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export default async function BlogPost({ postContent }) {
  const rawHtml = marked.parse(postContent);
  const cleanHtml = sanitizeHtml(rawHtml);

  return (
    <article 
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "When to Use Client Components",
      },
      {
        type: "paragraph",
        text: "Server Components do not replace client components; they complement them. Use Client Components ('use client') whenever you need:",
      },
      {
        type: "list",
        items: [
          "State management: useState, useReducer, or Zustand/Redux stores.",
          "Lifecycle and effects: useEffect, useLayoutEffect.",
          "Browser-only APIs: window, localStorage, geolocation, or intersection observers.",
          "User event handlers: onClick, onChange, onSubmit.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "PostgreSQL Indexing Strategies for Real Apps",
    slug: "postgres-indexing-strategies",
    excerpt:
      "Beyond the basics — partial indexes, covering indexes, and how to read EXPLAIN ANALYZE without crying.",
    category: "Database",
    date: "2025-08-10",
    readTime: "11 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Most web developers know how to add a standard B-Tree index on a foreign key or email column. But when your database grows from 10,000 rows to 10 million rows, standard indexes can balloon disk usage and slow down writes. Here is how to index intelligently in PostgreSQL.",
      },
      {
        type: "heading",
        level: 2,
        text: "Partial Indexes: Save Disk & Boost Speed",
      },
      {
        type: "paragraph",
        text: "If you only ever query active users or pending orders, why index the 95% of rows that are inactive or archived? Partial indexes let you attach a WHERE clause directly to your index:",
      },
      {
        type: "code",
        language: "sql",
        code: `-- Instead of indexing all 5,000,000 orders:
CREATE INDEX idx_orders_pending_created 
ON orders (created_at DESC) 
WHERE status = 'PENDING';`,
      },
      {
        type: "quote",
        text: "An index is not free. Every INSERT, UPDATE, and DELETE must update every relevant index. Index only what you search, when you search it.",
      },
      {
        type: "heading",
        level: 2,
        text: "Covering Indexes with the INCLUDE Clause",
      },
      {
        type: "paragraph",
        text: "When PostgreSQL searches an index, it finds the matching index tuples and then does a 'Heap Fetch' to read the actual table row from disk. With covering indexes, you can include extra columns directly in the index leaf pages, allowing for an 'Index Only Scan':",
      },
      {
        type: "code",
        language: "sql",
        code: `-- Includes 'display_name' and 'avatar_url' inside the index payload
CREATE INDEX idx_users_email_covering 
ON users (email) 
INCLUDE (display_name, avatar_url);

-- This query reads purely from the index without touching the table heap!
SELECT display_name, avatar_url FROM users WHERE email = 'dev@example.com';`,
      },
      {
        type: "heading",
        level: 2,
        text: "Reading EXPLAIN ANALYZE",
      },
      {
        type: "paragraph",
        text: "Never assume your index is being used without running EXPLAIN (ANALYZE, BUFFERS). Watch out for 'Seq Scan' on large tables, and check the 'Buffers: shared hit' to verify how many pages PostgreSQL read from RAM versus disk.",
      },
    ],
  },
  {
    id: 4,
    title: "Why I Stopped Over-Engineering My Side Projects",
    slug: "stopped-over-engineering-side-projects",
    excerpt:
      "A short reflection on shipping fast, keeping things boring, and saving the clever stuff for production.",
    category: "Career",
    date: "2025-07-22",
    readTime: "4 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "We have all been there. You get an idea on a Saturday morning for a simple link-sharing tool. By Sunday night, you have set up a Kubernetes cluster, a multi-tenant PostgreSQL schema, Apache Kafka for event-driven messaging, and Redis clusters. But not a single user can log in.",
      },
      {
        type: "quote",
        text: "The graveyard of abandoned side projects is paved with microservices and premature distributed systems.",
      },
      {
        type: "heading",
        level: 2,
        text: "The 3 Rules I Now Follow",
      },
      {
        type: "list",
        items: [
          "Use Boring Tech: Choose the tools you can write in your sleep without checking documentation every 5 minutes.",
          "Single Database & Single Container: A single managed PostgreSQL instance can easily handle tens of thousands of requests per second.",
          "Ship in 7 Days: If the core value proposition cannot be demonstrated in one week, scope down relentlessly.",
        ],
      },
      {
        type: "paragraph",
        text: "Side projects are meant to solve problems and bring joy. Once you treat simplicity as a competitive advantage, shipping software becomes fun again.",
      },
    ],
  },
  {
    id: 5,
    title: "Deploying Node Apps on a VPS Without Losing Sleep",
    slug: "deploy-node-vps",
    excerpt:
      "PM2, Nginx, and Certbot — the reliable trio for getting your Node backend live on a $6 droplet.",
    category: "DevOps",
    date: "2025-07-05",
    readTime: "9 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Serverless platforms and PaaS providers like Vercel and Railway are fantastic, but there comes a time when you want predictable pricing and total control over your server environment. For $5 to $10 a month, a standard Linux VPS can comfortably run multiple Node APIs, a reverse proxy, and SSL certificates.",
      },
      {
        type: "heading",
        level: 2,
        text: "Process Management with PM2",
      },
      {
        type: "paragraph",
        text: "In production, Node processes must automatically restart upon server reboot or uncaught exceptions. PM2 manages cluster mode and monitoring effortlessly:",
      },
      {
        type: "code",
        language: "javascript",
        code: `// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "portfolio-api",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 4001
      }
    }
  ]
};`,
      },
      {
        type: "heading",
        level: 2,
        text: "Configuring Nginx Reverse Proxy with SSL",
      },
      {
        type: "paragraph",
        text: "Rather than exposing your Node port directly to the internet, put Nginx in front of it. Nginx handles gzip compression, rate limiting, and SSL termination with Certbot:",
      },
      {
        type: "code",
        language: "nginx",
        code: `server {
    server_name api.indadulhoque.dev;

    location / {
        proxy_pass http://127.0.0.1:4001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}`,
      },
      {
        type: "paragraph",
        text: "Run `sudo certbot --nginx -d api.indadulhoque.dev` and Let's Encrypt will automatically provision your free, auto-renewing SSL certificate.",
      },
    ],
  },
  {
    id: 6,
    title: "Writing Better Commit Messages in 10 Minutes",
    slug: "better-commit-messages",
    excerpt:
      "Small habits that make your git history a joy to read six months from now.",
    category: "Career",
    date: "2025-06-18",
    readTime: "5 min read",
    author: {
      name: "Indadul Hoque",
      role: "Full-Stack Engineer",
      avatar: "/myPhoto.png",
    },
    blocks: [
      {
        type: "paragraph",
        text: "We have all seen git logs filled with 'fixed stuff', 'wip', 'oops', and 'final final fix'. Good git commit messages are not for the compiler; they are an asynchronous communication tool for your teammates and your future self.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Conventional Commits Formula",
      },
      {
        type: "paragraph",
        text: "A structured format removes decision fatigue when committing code:",
      },
      {
        type: "code",
        language: "bash",
        code: `<type>(<optional scope>): <imperative description>

[optional body explaining the WHY, not just the WHAT]

[optional footer(s) like Closes #123]`,
      },
      {
        type: "list",
        items: [
          "feat: add biometric authentication to login screen",
          "fix: prevent token expiration race condition during parallel fetch",
          "refactor: extract reusable modal drawer component",
          "perf: optimize image resizing pipeline using webp",
        ],
      },
      {
        type: "quote",
        text: "If you can't describe your commit in one imperative sentence, your commit is probably doing too many different things.",
      },
    ],
  },
];
