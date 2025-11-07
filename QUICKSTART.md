# Quick Start Guide

## Get Started in 5 Minutes

### 1. Setup (First Time Only)

```bash
# Navigate to the project folder
cd benefits-presentation

# Install dependencies (takes 1-2 minutes)
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173` - the PDF button will work here!

---

## Deploy to GitHub Pages (One-Time Setup)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it anything (e.g., "benefits-presentation")
3. **Don't** check any initialization options

### Step 2: Update Configuration

Edit `vite.config.js` and change line 6:
```javascript
base: '/your-repo-name/', // Replace with your actual repo name
```

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` and `your-repo-name` below:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### Step 4: Deploy

```bash
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/your-repo-name/
```

---

## Make Updates Later

```bash
# Make your changes, then:
git add .
git commit -m "Describe your changes"
git push
npm run deploy
```

---

## Test PDF Generation

1. Go to your hosted URL
2. Use the calculator to enter data
3. Click "Generate PDF"
4. Browser print dialog opens
5. Choose "Save as PDF"
6. Download your PDF!

---

## Need Help?

- **PDF not generating?** Make sure you're using the hosted version (not Claude preview)
- **404 error?** Double-check the `base` path in `vite.config.js`
- **Build failing?** Delete `node_modules` folder and run `npm install` again

That's it! 🎉
