# Calero Studio

**Calm by Design.**

A modern lighting e-commerce experience built with Next.js, TypeScript, and a strong focus on visual design, interaction, and usability.

**Live website:** [calero.studio](https://calero.studio)

---

## Overview

Calero Studio is an independent e-commerce project focused on modern lighting and considered interior design.

The goal was to create an online store that feels closer to a carefully designed editorial experience than a traditional e-commerce template.

The project combines a minimal visual identity, expressive typography, cinematic imagery, and subtle motion with the functionality of a complete online store.

From the custom storefront and interactive product galleries to checkout, product management, and responsive layouts, the application was designed and developed from the ground up.

## Features

### Storefront & User Experience

- Fully responsive layouts for desktop, tablet, and mobile
- Custom landing page with editorial sections and animated transitions
- Interactive product galleries and image previews
- Kinetic hover interactions with cursor-following typography
- Smooth scrolling and scroll-based animations
- Product filtering, sorting, and category navigation
- Product variants, pricing, and availability
- Persistent shopping cart
- Fullscreen product image galleries
- Light and dark visual treatments across the experience

### E-commerce

- Stripe Checkout integration
- Dynamic product and variant selection
- Shopping cart with quantity management
- Shipping configuration and checkout flows
- Order confirmation and cancellation pages
- Product and inventory management through a custom admin interface

### Performance & Accessibility

- Responsive image delivery using Next.js
- Locally hosted typography
- Component-based architecture
- Semantic HTML and accessible navigation
- Keyboard-friendly interactive elements
- SEO metadata and social sharing previews
- Motion and layout optimization across screen sizes

## Tech Stack

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| Next.js           | React framework and App Router    |
| React             | Component-based user interface    |
| TypeScript        | Type safety                       |
| Tailwind CSS      | Styling and responsive layouts    |
| Framer Motion     | UI animations and transitions     |
| Lenis             | Smooth scrolling                  |
| Prisma            | Database access and data modeling |
| PostgreSQL / Neon | Database                          |
| Stripe            | Payment processing                |
| Zustand           | Client-side shopping cart state   |
| Vercel            | Hosting and deployment            |

## Design & Interaction

The visual direction of Calero Studio is inspired by contemporary editorial design and minimal interiors.

Instead of relying on conventional e-commerce UI patterns, the interface uses generous spacing, large-scale typography, restrained colors, and considered motion to create a more immersive browsing experience.

Some of the custom interactions include:

- **Kinetic cursors:** Text follows the pointer with smooth interpolation, subtle rotation, and velocity-based letter spacing.
- **Animated imagery:** Product images use entrance transitions, hover scaling, and carefully timed reveals.
- **Scroll-driven storytelling:** Editorial sections combine typography, layered imagery, and parallax.
- **Responsive navigation:** A custom navigation experience designed for both desktop and mobile.
- **Product exploration:** Interactive galleries and fullscreen viewing for a more engaging shopping experience.

Animations are designed to complement the content rather than distract from it.

## Project Structure

The project is organized around the Next.js App Router with reusable components and clearly separated application logic.

```text
app/
  api/               API routes and integrations
  shop/              Product listing
  products/          Product detail pages
  cart/              Shopping cart
  contact/           Contact page
  admin/             Product management
  success/           Checkout confirmation
  cancel/            Checkout cancellation

components/
  cart/              Cart UI and interactions
  shop/              Product cards and filters
  ui/                Reusable interface components
  ...                Landing page and editorial sections

lib/                 Shared utilities and application logic
prisma/              Database schema and migrations
public/              Images, fonts, and static assets
```

## Getting Started

### Prerequisites

Make sure you have the following installed or configured:

- Node.js
- npm
- A PostgreSQL database
- Stripe credentials for payment functionality

### Installation

Clone the repository and install dependencies.

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### Environment Variables

Create a `.env` file in the project root.

Configure the environment variables required by your database, authentication, Stripe integration, and any additional services used by the application.

Refer to the environment variable names in the source code and Prisma configuration.

**Never commit secrets or production API keys to version control.**

### Database Setup

Configure your PostgreSQL connection, generate the Prisma client, and apply the database migrations used by your project.

```bash
npx prisma generate
```

### Development

Start the development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Deployment

Calero Studio is deployed using Vercel.

The application uses Next.js server-side capabilities alongside external services for data persistence and payment processing.

Production deployment requires correctly configured environment variables, database access, and Stripe integration settings.

## What I Focused On

This project gave me the opportunity to work across both frontend and backend development while maintaining a strong focus on design.

Key areas of development included:

- Translating a visual concept into a responsive interface
- Building reusable components in React and TypeScript
- Creating custom interactions and animations
- Designing and implementing product management functionality
- Working with relational data through Prisma
- Integrating payments and checkout functionality
- Balancing visual complexity with usability and performance

## Author

**Jonas Nygaard**  
Designer & Developer — Oslo, Norway

Portfolio: [jonasnygaard.com](https://www.jonasnygaard.com)

## License

This is an independent project. All rights reserved unless otherwise specified.
