# Ali Goodarzi - Personal Portfolio & Research Website

A modern, AI-themed personal portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Stunning AI/HCI Aesthetic**: Animated circuit boards, neural networks, gears, and AI-themed visuals
- **Interactive Elements**: AI chat simulator, typewriter effects, and smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **High Readability**: Carefully designed color scheme with excellent contrast
- **Multiple Pages**: Home, Research, Projects, Publications, Skills, Contact

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- shadcn/ui components
- React Router (HashRouter for GitHub Pages)

---

## 🚀 Deploy to GitHub Pages (No Server Needed!)

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (e.g., `portfolio` or `aligoodarzi.github.io`)
3. Make it **Public**
4. Don't initialize with README (you already have files)

### Step 2: Update the Base Path

Open `vite.config.ts` and update the `base` path with your repository name:

```typescript
base: mode === "production" ? "/your-repo-name/" : "/",
```

**Example**: If your repo is named `portfolio`:
```typescript
base: mode === "production" ? "/portfolio/" : "/",
```

**Special case**: If your repo is named `yourusername.github.io`, use:
```typescript
base: "/",
```

### Step 3: Push Your Code to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Portfolio"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. The workflow will automatically run and deploy your site!

### Step 5: Access Your Site

Your site will be live at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Or if you used `username.github.io` as repo name:
- `https://YOUR_USERNAME.github.io/`

---

## 🛠️ Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AIChatSimulator.tsx    # Interactive AI chat demo
│   ├── CircuitBoard.tsx       # Animated circuit SVG
│   ├── NeuralBackground.tsx   # Animated background
│   ├── TypewriterText.tsx     # Typewriter effect
│   ├── Navbar.tsx             # Navigation
│   └── Layout.tsx             # Page layout
├── pages/
│   ├── Index.tsx        # Home page
│   ├── Research.tsx     # Research page
│   ├── Projects.tsx     # Projects showcase
│   ├── Publications.tsx # Academic publications
│   ├── Skills.tsx       # Technical skills
│   └── Contact.tsx      # Contact info
├── index.css            # Global styles & animations
└── App.tsx              # Router setup
```

---

## 🎨 Customization

### Change Colors
Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: 180 85% 55%;      /* Cyan */
  --secondary: 145 75% 50%;    /* Green */
  --accent: 270 65% 65%;       /* Purple */
  --background: 220 20% 12%;   /* Dark blue-gray */
  --foreground: 210 20% 95%;   /* Light text */
}
```

### Update Content
- Edit `src/pages/*.tsx` files to update text content
- Update links in `src/components/Navbar.tsx`
- Modify the conversation in `src/components/AIChatSimulator.tsx`

### Add Your Profile Image
1. Place your image in `src/assets/`
2. Import it in `Index.tsx`:
```tsx
import profileImg from "@/assets/your-image.jpg";
```

---

## 📝 Troubleshooting

### Site shows 404 after deployment
- Make sure the `base` path in `vite.config.ts` matches your repo name
- Use HashRouter (already configured) for GitHub Pages compatibility
- Check that GitHub Actions workflow completed successfully

### Styles not loading
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors
- Verify the build completed without errors

### Local development issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📄 License

MIT License - Feel free to use and modify for your own portfolio!

---

Built with ❤️ by Ali Goodarzi
