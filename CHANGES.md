# HisabKar — Updated Codebase

## What changed from v1

### Architecture
- Added `lib/store.ts` — shared types (`Customer`, `ServiceType`, `Status`) and seed data
- Added `lib/CustomerContext.tsx` — React Context wrapping the whole app so all pages share one customer list
- `layout.tsx` now wraps children in `<CustomerProvider>` and sets proper metadata

### Components (all converted to TypeScript)
| File | What changed |
|---|---|
| `BottomNav.tsx` | Was broken (rendered outside JSX in dashboard). Now properly typed, fixed Add button as floating pill |
| `StatCard.tsx` | Now has `variant` prop (`success`, `danger`, `warning`, `default`) for color-coded cards |
| `CustomerItem.tsx` | New: shows service icon, due day, status badge. Has "Send Reminder" + "Mark Paid" buttons |

### Pages
| Page | What changed |
|---|---|
| `page.tsx` (Home) | Stats now computed from real context data. Progress bar. Recent activity list |
| `dues/page.tsx` | Filter tabs (All / Pending / Overdue). Shows outstanding total. Actions per customer |
| `add-customer/page.tsx` | Full validation. Service type picker. Due day picker. Redirects to home on save |
| `pro/page.tsx` | Usage meter with real customer count. Pro features list |
| `profile/page.tsx` | Real stats from context. Settings list. WhatsApp toggle |
| `dashboard/page.tsx` | Redirects to `/` (dashboard = home now) |

## How to run

```bash
# Copy these files into your existing hisabkar-app folder
# (replace app/ and add lib/)

npm install
npm run dev
```

## Next steps to go live

1. **Auth** — Add NextAuth + phone OTP (Twilio Verify or Firebase Auth)
2. **Database** — Replace `seedCustomers` in `CustomerContext.tsx` with Supabase fetch
3. **Payments** — Razorpay payment links API in an `/api/create-link` route
4. **WhatsApp** — Twilio WhatsApp or Meta Cloud API in `/api/send-reminder`
5. **Cron** — Vercel Cron job at `app/api/cron/monthly-reminder/route.ts`
6. **Webhooks** — Razorpay webhook at `app/api/webhook/razorpay/route.ts` to auto-mark paid
