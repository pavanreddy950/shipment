# TradeIntel Platform - Setup Guide

## 🚀 Quick Start

Follow these steps to get the application running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Date-fns

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
vujis/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/                # Login page
│   │   ├── signup/               # Signup page
│   │   └── forgot-password/      # Password reset
│   ├── (dashboard)/              # Protected dashboard routes
│   │   └── dashboard/            # Dashboard pages
│   │       ├── page.tsx          # Main dashboard
│   │       ├── search/           # Search & discovery
│   │       ├── companies/        # Company listings & profiles
│   │       ├── email-generator/  # AI email generator
│   │       ├── billing/          # Billing & credits
│   │       ├── exports/          # Data exports
│   │       └── settings/         # Settings
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Skeleton.tsx
│   ├── charts/                   # Chart components
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   └── PieChart.tsx
│   ├── landing/                  # Landing page components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   └── dashboard/                # Dashboard components
│       ├── Sidebar.tsx
│       └── Header.tsx
│
├── lib/                          # Utilities and helpers
│   ├── data/                     # Mock data
│   │   ├── mock-generator.ts    # Data generation logic
│   │   └── mock-data.ts          # Mock data store
│   └── utils.ts                  # Utility functions
│
├── types/                        # TypeScript type definitions
│   └── index.ts
│
└── Configuration files
    ├── package.json              # Dependencies
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.ts        # Tailwind CSS config
    ├── next.config.js            # Next.js config
    └── postcss.config.js         # PostCSS config
```

## 🎨 Features

### Landing Page
- ✅ Animated hero section with gradient orbs
- ✅ Feature cards with hover effects
- ✅ Pricing plans with comparison
- ✅ Smooth scroll and parallax effects
- ✅ Responsive navigation

### Authentication
- ✅ Login with demo mode
- ✅ Signup with validation
- ✅ Forgot password flow
- ✅ Animated transitions

### Dashboard
- ✅ Real-time stats cards
- ✅ Interactive charts (Line, Bar, Pie)
- ✅ Recent shipments feed
- ✅ Responsive layout

### Search & Discovery
- ✅ Advanced search with filters
- ✅ 5,000+ companies dataset
- ✅ Real-time filtering
- ✅ Pagination (25 items per page)
- ✅ Export functionality

### Company Profiles
- ✅ Detailed company information
- ✅ Shipment history timeline
- ✅ Interactive charts
- ✅ Contact unlock system (with credit animation)
- ✅ Quick actions

### AI Email Generator
- ✅ Multiple email variants
- ✅ Typing animation effect
- ✅ Copy to clipboard
- ✅ Customizable templates
- ✅ Tone selection

### Billing & Credits
- ✅ Current plan overview
- ✅ Credit usage tracking with progress bar
- ✅ Plan upgrade/downgrade
- ✅ Invoice history
- ✅ Usage breakdown charts

### Exports & Downloads
- ✅ Multiple export formats (CSV, Excel, PDF)
- ✅ Export progress animation
- ✅ Download history
- ✅ Export statistics

### Settings
- ✅ Profile management
- ✅ Company information
- ✅ Team member management
- ✅ API key generation
- ✅ Security settings
- ✅ Notification preferences

## 🎭 Demo Mode

The application runs in demo mode with mock data:
- **Authentication**: Any email/password combination works
- **Data**: 12,000+ shipments, 5,000+ companies
- **Credits**: Virtual credits system
- **All features**: Fully functional with simulated API calls

## 🎨 Design System

### Colors
- **Background**: `#0a0a0f`
- **Surface**: `#13131a`
- **Primary**: `#3b82f6` (Blue)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Danger**: `#ef4444`

### Animations
- Framer Motion for page transitions
- Smooth hover effects
- Skeleton loaders
- Progress animations
- Chart animations

## 🔧 Customization

### Changing Mock Data Volume
Edit `lib/data/mock-data.ts`:
```typescript
export const mockCompanies: Company[] = generateCompanies(5000); // Change number
export const mockShipments: Shipment[] = generateShipments(mockCompanies, 12000); // Change number
```

### Modifying Color Scheme
Edit `tailwind.config.ts` colors section

### Adding New Pages
1. Create page in `app/(dashboard)/dashboard/`
2. Add route to `components/dashboard/Sidebar.tsx`

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly interactions

## 🚀 Performance

- ✅ Code splitting
- ✅ Lazy loading
- ✅ Optimized animations
- ✅ Virtual scrolling for large datasets
- ✅ Memoized computations

## 🔒 Security Notes

This is a **frontend demo** with no backend:
- All data is client-side
- No real API calls
- No database connections
- LocalStorage for session management

## 📄 License

This is a demo project. All rights reserved.

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Dependencies installation issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🎉 Ready to Demo!

Your enterprise-grade Trade Intelligence platform is ready. Open [http://localhost:3000](http://localhost:3000) and explore all features!
