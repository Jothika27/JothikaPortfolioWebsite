# Jothika R - Portfolio Website Local Setup

## Quick Start Guide for VS Code

### Prerequisites
1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **VS Code** with these extensions:
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Tailwind CSS IntelliSense

### Setup Steps

1. **Download/Clone the project** to your local machine

2. **Open in VS Code**
   ```bash
   cd JothikaPortfolioWebsite
   code .
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create required directories** (if missing)
   ```bash
   mkdir server\public
   ```

5. **Build the client first** (required for Windows)
   ```bash
   npm run build
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open your portfolio**
   - Browser: `http://localhost:5000`

### Your Portfolio Features
- **Personal Information**: Your authentic resume data
- **Experience**: Zuci Systems (Current) & KGISL-Sony ODC
- **Skills**: Java, Spring Boot, TypeScript, AWS, MongoDB, etc.
- **Education**: B.Tech IT from Karpagam College of Engineering
- **Certifications**: Splunk Enterprise, Java HackerRank
- **Projects**: Spring Boot Sample Application with GitHub link

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build

### Troubleshooting
If you get "build directory not found" error:
1. Run `npm run build` first
2. Ensure `server/public` directory exists
3. Then run `npm run dev`

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express.js + TypeScript
- **Build**: Vite

Your portfolio website showcases your real professional experience and technical skills with smooth animations and responsive design.