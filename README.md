# EzyShare - Quick & Secure File Transfer

<div align="center">
  <img src="./public/logo192.png" alt="EzyShare Logo" width="120" />
  <br />
  <p><strong>Share files instantly with end-to-end encryption</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#live-demo">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#performance">Performance</a>
  </p>
</div>

## 📋 Overview

EzyShare is a modern, secure file-sharing platform that eliminates the need for user accounts or complex setup processes. Upload files up to 25MB and share them instantly with anyone through secure PIN protection or QR codes.

## ✨ Features <a name="features"></a>

- 📤 **Instant File Sharing** - Upload files up to 25MB in seconds
- 🔒 **6-Digit PIN Protection** - Secure all shared files with a PIN
- 📱 **QR Code Generation** - Share download links via scannable QR codes
- 🔐 **End-to-End Encryption** - Files are encrypted during transmission and storage
- 👤 **No Registration** - No accounts or signups required
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⏱️ **Auto-Expiry System** - Files automatically delete after 24 hours
- 🚀 **Optimized Performance** - Fast loading with code-splitting and lazy loading

## 🔗 Live Demo <a name="live-demo"></a>

Try EzyShare now: [https://ezyshare.netlify.app](https://ezyshare.netlify.app)

## 🛠️ Tech Stack <a name="tech-stack"></a>

- **Frontend:**
  - React 18 with TypeScript
  - Vite for development & building
  - Tailwind CSS for responsive styling
  - React Router for navigation

- **Backend:**
  - Supabase for storage, security, and file management
  - End-to-end encryption for file protection

## 🚀 Getting Started <a name="getting-started"></a>

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```powershell
   git clone https://github.com/yourusername/ezy-share-quick-transfer.git
   cd ezy-share-quick-transfer
   ```

2. **Install dependencies**
   ```powershell
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   
   Create a `.env` file in the project root with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```powershell
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```powershell
   npm run build
   # or
   yarn build
   ```

## 🌐 Deployment <a name="deployment"></a>

### Static Hosting Deployment

1. Build your project: `npm run build`
2. Upload the contents of the `dist` folder to any static site hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

### Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Set up the `file_shares` table with these columns:
   - `id` (uuid, primary key)
   - `file_name` (text)
   - `file_path` (text)
   - `pin_code` (text)
   - `created_at` (timestamp)
   - `download_count` (integer)
3. Create a storage bucket named `file-shares`
4. Configure Row Level Security (RLS) policies:
   ```sql
   CREATE POLICY "Anyone can upload files" 
   ON storage.objects FOR INSERT 
   WITH CHECK (bucket_id = 'file-shares');
   
   CREATE POLICY "Files accessible with pin code" 
   ON storage.objects FOR SELECT 
   USING (bucket_id = 'file-shares');
   ```

## ⚡ Performance Optimizations <a name="performance"></a>

EzyShare implements several performance-enhancing techniques:

### Code Optimization

- **Route-based Code Splitting** - Each page loads only when needed
- **Lazy Component Loading** - Heavy components (like QR generators) render on demand
- **Dynamic Imports** - Non-critical resources load after the initial render

### Resource Management

- **Image Optimization** - Lazy loading and WebP format support
- **Asset Minification** - Compressed stylesheets and scripts
- **Efficient Caching** - Proper cache headers for static resources

### Network Efficiency

- **API Batching** - Reduced API calls by combining requests
- **Optimized Supabase Queries** - Efficient data fetching patterns

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ by [Alqama-Dev](https://github.com/alqama-shahzad)

---

**Ready to share files securely?** Star this repo and contribute to make EzyShare even better!
