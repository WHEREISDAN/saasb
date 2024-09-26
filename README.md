# SaaS Boilerplate with Next.js, Firebase, and Stripe

A powerful, feature-rich SaaS boilerplate built with Next.js, Firebase, and Stripe. Jumpstart your SaaS project to build faster and launch sooner.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
  - [Development](#development)
  - [Production](#production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- **Next.js Integration**: Leverage the power of Next.js for server-side rendering and optimal performance.
- **Firebase Backend**: Utilize Firebase for authentication, database, and hosting capabilities.
- **Stripe Integration**: Easily implement payment processing and subscription management with Stripe.
- **Authentication Ready**: Pre-built authentication flows for quick and secure user management.
- **Responsive Design**: Mobile-first approach ensures your app looks great on all devices.
- **Customizable Theme**: Modern UI components with Tailwind CSS for easy customization.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed (version 18 or newer recommended)
- npm or yarn package manager
- Firebase account with a project set up
- Stripe account with API keys

### Installation
1. Clone the repository:
```bash
git clone https://github.com/whereisdan/saasb.git
cd saas-boilerplate
```

2. Install dependencies:
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:
```env
Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_admin_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_firebase_admin_private_key (ensure newlines are properly formatted)
Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
Other Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> Note: Keep your environment variables secure and do not commit `.env.local` to version control.

## Running the App

### Development
To run the application in development mode:
```bash
npm run dev
```
Or with yarn:
```bash
yarn dev
```

The app will be available at http://localhost:3000.

### Production
To build and start the application in production mode:
1. Build the app:
```bash
npm run build
```
Or:
```bash
yarn build
```

2. Start the app:
```bash
npm start
```
Or:
```bash
yarn start
```

## Deployment
You can deploy this Next.js app to any hosting provider that supports Node.js. Some popular options include:
- Vercel: Seamless deployment for Next.js applications.
- Firebase Hosting: Use Firebase's hosting capabilities.
- Heroku
- DigitalOcean App Platform

Ensure that you set up the environment variables on your hosting platform accordingly.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Built with Next.js
- Authentication and backend powered by Firebase
- Payment processing with Stripe
- UI components styled with Tailwind CSS
- Icons provided by Lucide React
