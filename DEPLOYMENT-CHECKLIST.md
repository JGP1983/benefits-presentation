# Deployment Checklist ✅

Use this checklist to deploy your Benefits Presentation app to GitHub Pages.

## Pre-Deployment

- [ ] Extract the `benefits-presentation.zip` file
- [ ] Open terminal/command prompt in the `benefits-presentation` folder
- [ ] Run `npm install` (wait for it to complete)
- [ ] Run `npm run dev` to test locally
- [ ] Verify the app works at `http://localhost:5173`
- [ ] Test the "Generate PDF" button locally

## GitHub Repository Setup

- [ ] Log into GitHub (create account if needed)
- [ ] Create new repository (Settings → New)
- [ ] Name your repository (e.g., "benefits-presentation")
- [ ] Do NOT check "Initialize with README" or any other options
- [ ] Copy the repository URL

## Configuration

- [ ] Open `vite.config.js` in a text editor
- [ ] Change `base: '/benefits-presentation/'` to match YOUR repository name
- [ ] Save the file

## Git Initialization

Run these commands (replace YOUR_USERNAME and your-repo-name):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

- [ ] `git init` completed
- [ ] `git add .` completed
- [ ] `git commit -m "Initial commit"` completed
- [ ] `git branch -M main` completed
- [ ] `git remote add origin...` completed
- [ ] `git push -u origin main` completed

## Deploy

- [ ] Run `npm run deploy`
- [ ] Wait for deployment to complete (takes 1-2 minutes)
- [ ] Check for success message

## GitHub Pages Setup

- [ ] Go to your repository on GitHub
- [ ] Click "Settings" tab
- [ ] Click "Pages" in left sidebar
- [ ] Under "Source", select "gh-pages" branch
- [ ] Click "Save"
- [ ] Wait 2-5 minutes for site to go live

## Verification

- [ ] Visit `https://YOUR_USERNAME.github.io/your-repo-name/`
- [ ] Navigate through all slides
- [ ] Fill out the calculator
- [ ] Click "Generate PDF"
- [ ] Verify PDF generates correctly
- [ ] Save the PDF and check the output

## Share Your App

Your live URL:
```
https://YOUR_USERNAME.github.io/your-repo-name/
```

- [ ] Bookmark your live URL
- [ ] Share with your team/clients
- [ ] Test on different devices (mobile, tablet, desktop)

## Future Updates

When you need to make changes:

```bash
# Make your edits, then:
git add .
git commit -m "Describe what you changed"
git push
npm run deploy
```

- [ ] Know how to make updates
- [ ] Tested making a small change
- [ ] Successfully redeployed after changes

## Troubleshooting

If something doesn't work:

**PDF not generating?**
- Make sure you're on the live hosted version (not localhost or Claude)
- Try a different browser
- Check browser console for errors (F12)

**404 Error on GitHub Pages?**
- Verify `base` in `vite.config.js` matches repo name exactly
- Check that gh-pages branch exists
- Wait 5-10 minutes after initial deployment

**Build errors?**
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again
- Try `npm run build` to see specific errors

**Git errors?**
- Make sure Git is installed: `git --version`
- Check you're in the right directory
- Verify GitHub credentials are set up

---

## Notes

- Keep your repository public for free GitHub Pages
- Private repos need GitHub Pro for Pages
- The PDF feature requires a web browser environment
- Changes can take 1-2 minutes to appear after deployment

## Success! 🎉

When all checkboxes are complete, your app is live and ready to use!

Live URL: ___________________________________

Deployed on: ___________________________________

Last updated: ___________________________________
