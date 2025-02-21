app
 ├── (public)               # ✅ Publicly accessible pages (Landing, Pricing, Auth)
 │   ├── layout.tsx         # ✅ Shared layout for public pages
 │   ├── page.tsx           # ✅ Landing Page (/)
 │   ├── pricing/page.tsx   # ✅ Pricing Page (/pricing)
 │   ├── auth/signin/page.tsx   # ✅ Custom Sign-In Page (/auth/signin)
 ├── (authenticated)        # ✅ Protected pages (Require login)
 │   ├── layout.tsx         # ✅ Shared layout for authenticated pages
 │   ├── dashboard/page.tsx # ✅ Dashboard (/dashboard)
 │   ├── repos/page.tsx     # ✅ Repositories (/repos)
 │   ├── settings/page.tsx  # ✅ User Settings (/settings)
 ├── api                    # ✅ API Routes (NextAuth, Webhooks)
 │   ├── auth/[...nextauth]/route.ts  # ✅ NextAuth API
 │   ├── repos/route.ts     # ✅ Fetch Repositories API
 ├── components             # ✅ Reusable UI Components
 │   ├── ui/                # ✅ UI Components (Buttons, Modals, Inputs)
 │   ├── layout/            # ✅ Layout Components (Navbar, Sidebar, Footer)
 │   ├── cards/             # ✅ Cards (RepoCard, PRCard)
 ├── hooks                  # ✅ Reusable Hooks (Custom useFetch, useAuth)
 ├── lib                    # ✅ Utilities & Config (db, auth, helpers)
 │   ├── mongodb.ts         # ✅ MongoDB Client
 │   ├── auth.ts            # ✅ NextAuth Config
 │   ├── utils.ts           # ✅ General utility functions
 ├── styles                 # ✅ Global & Component Styles
 │   ├── globals.css        # ✅ Global styles
 │   ├── tailwind.config.js # ✅ Tailwind config
 ├── middleware.ts          # ✅ Middleware for Auth Protection
├── next.config.js          # ✅ Next.js Config
├── tsconfig.json           # ✅ TypeScript Config
├── .eslintrc.json          # ✅ ESLint Config
├── .prettierrc.json        # ✅ Prettier Config
