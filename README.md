# EzyShare - Simple & Secure File Sharing

EzyShare is a modern web application that allows users to share files quickly and securely without requiring user accounts or complicated setup.

## Features

- **Easy File Sharing** - Upload files up to 25MB and share them instantly
- **Secure PIN Protection** - Files are protected with a 6-digit PIN code
- **QR Code Sharing** - Easily share download links via QR codes
- **End-to-End Encryption** - Files are securely transmitted and stored
- **No Registration Required** - Start sharing immediately without accounts
- **Modern Interface** - Clean, responsive design works on all devices
- **7-Day Auto-Expiry** - Files are automatically removed after 7 days

## Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Supabase for backend storage and file handling

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ezy-share-quick-transfer.git
   cd ezy-share-quick-transfer
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

4. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Build for production
   ```
   npm run build
   # or
   yarn build
   ```

## Deployment

The project can be deployed to any static site hosting service:

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your hosting service
3. Ensure you've set up the necessary Supabase security policies

## Setting Up Supabase

1. Create a new Supabase project
2. Create a `file_shares` table with the necessary columns
3. Enable Row Level Security (RLS) and set up appropriate policies
4. Create a storage bucket for file uploads

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Alqama-Dev 

---

 Before deploying, be sure to generate favicon files as specified in the index.html metadata.
