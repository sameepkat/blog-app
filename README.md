# Blog App

A modern, full-featured blog application built with Next.js 15, React 19, and TypeScript. This application provides a seamless blogging experience with a clean, responsive interface powered by Radix UI components and Tailwind CSS.

## Description

Blog App is a web-based platform for creating, reading, and managing blog posts. Built with the latest web technologies, it offers a smooth user experience with features like authentication, state management, and a beautiful UI. The application includes pre-loaded sample blogs covering topics like development tools, productivity, and personal growth.

## Features

- **Modern Tech Stack**: Built with Next.js 15 and React 19 for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Tailwind CSS with custom theming support
- **UI Components**: Professional components built with Radix UI primitives
- **State Management**: Efficient client-side state management with Zustand
- **Authentication**: Login system with localStorage-based session management
- **Toast Notifications**: User feedback through Sonner toast notifications
- **Theme Support**: Light/dark mode with next-themes
- **Docker Support**: Containerized deployment with included Dockerfile

## Tech Stack

- **Framework**: Next.js 15.3.0 with Turbopack
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with custom animations
- **Component Library**: Radix UI (Alert Dialog, Label, Icons, Slot)
- **State Management**: Zustand 5
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sameepkat/blog-app.git
cd blog-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

### Docker Deployment

Build and run with Docker:
```bash
docker build -t blog-app .
docker run -p 3000:3000 blog-app
```

## Project Structure

```
blog-app/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable UI components
│   └── lib/          # Utilities and stores
├── public/           # Static assets
└── Dockerfile        # Container configuration
```

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## License

This project is licensed under the GPL-3.0 License.