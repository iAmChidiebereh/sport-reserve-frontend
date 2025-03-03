# SportReserve Frontend

A modern web application for managing sports facility reservations at the University of Ibadan. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 User Authentication (Login/Register)
- 👥 Role-based Access Control (Admin/User)
- 🏟️ Facility Management
  - View available facilities
  - Add/Edit/Delete facilities (Admin)
  - Upload facility images
- 📅 Reservation System
  - Make reservations
  - Upload letter of request (PDF)
  - View reservation status
  - Calendar view for approved reservations
- 👤 User Management (Admin)
  - Invite new users
  - Manage user accounts
- 🏢 Unit Management (Admin)
  - Add/Edit/Delete units
  - Blacklist management
- 📝 Reservation Approval System (Admin)
  - Review letters of request
  - Approve/Deny reservations
  - Add verdict notes

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.x or later
- npm 9.x or later

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sportReserveFrontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_API_URL=<your-api-url>
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Login/Register page
├── components/
│   ├── admin/            # Admin-specific components
│   ├── facilities/       # Facility-related components
│   ├── reservations/     # Reservation-related components
│   └── ui/              # Reusable UI components
├── config/               # Configuration files
├── hooks/               # Custom React hooks
└── lib/                # Utility functions and types
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [React PDF](https://react-pdf.org/) - PDF viewing
- [React Day Picker](https://react-day-picker.js.org/) - Calendar functionality

## Features in Detail

### User Features
- View available sports facilities
- Make reservation requests with PDF letter upload
- Track reservation status
- View personal reservation history
- View facility calendar for approved reservations

### Admin Features
- Manage facilities (CRUD operations)
- Process reservation requests
- View and verify letters of request
- Add verdict notes for approvals/denials
- Manage users and units
- View comprehensive reservation calendar
- Send user invitations

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.****
