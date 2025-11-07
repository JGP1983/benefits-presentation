# Benefits Presentation App

An interactive benefits comparison presentation tool with PDF export capabilities.

## Features

- Interactive slideshow presentation
- Custom benefits calculator
- Cost comparison analysis
- Visual charts and graphs
- PDF generation via browser print
- Responsive design

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git
- GitHub account (for GitHub Pages deployment)

## Local Development Setup

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd benefits-presentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   
   This creates optimized files in the `dist` folder.

## Deploying to GitHub Pages

### First-time Setup

1. **Create a GitHub repository**
   - Go to GitHub and create a new repository
   - Name it `benefits-presentation` (or your preferred name)
   - Don't initialize with README, .gitignore, or license

2. **Update the base URL in vite.config.js**
   
   Open `vite.config.js` and change the `base` value to match your repository name:
   ```javascript
   base: '/your-repo-name/',
   ```

3. **Initialize Git and push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
   git push -u origin main
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select the `gh-pages` branch
   - Click "Save"
   - Your site will be live at: `https://YOUR_USERNAME.github.io/your-repo-name/`

### Subsequent Deploys

After making changes, simply run:
```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## Using the PDF Generation Feature

Once deployed to GitHub Pages (or any web hosting):

1. Navigate to your hosted app URL
2. Use the calculator to input your benefits data
3. Click the "Generate PDF" button
4. Your browser's print dialog will open
5. Select "Save as PDF" as the destination
6. Adjust print settings as needed (recommend landscape orientation)
7. Save your PDF

**Note:** The PDF generation uses `window.print()` which only works in proper web browser environments, not in the Claude preview.

## Alternative Hosting Options

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder after running `npm run build`
3. Or connect your GitHub repo for automatic deployments

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Static Web Hosting

After running `npm run build`, upload the contents of the `dist` folder to any static web host:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage
- Traditional web hosting (cPanel, etc.)

## Project Structure

```
benefits-presentation/
├── src/
│   ├── App.jsx                          # Main app component
│   ├── BenefitsPresentationPDF.jsx     # Presentation component
│   ├── main.jsx                         # React entry point
│   └── index.css                        # Global styles
├── index.html                           # HTML template
├── package.json                         # Dependencies and scripts
├── vite.config.js                       # Vite configuration
└── README.md                            # This file
```

## Troubleshooting

### PDF Generation Not Working
- Make sure you're accessing the app via HTTP/HTTPS, not file:// protocol
- Try different browsers (Chrome, Firefox, Edge, Safari)
- Check that the app is fully loaded before clicking Generate PDF

### GitHub Pages 404 Error
- Verify the `base` path in `vite.config.js` matches your repo name
- Make sure GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists
- Wait a few minutes after deployment for changes to propagate

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (should be 16+)

## Customization

- **Colors**: Modify gradient colors in the `slides` array
- **Branding**: Update titles and text in the component
- **Calculations**: Adjust benefit calculation logic as needed
- **Styling**: Modify `index.css` for custom styling

## Support

For issues or questions:
1. Check the GitHub Issues page
2. Review Vite documentation: [vitejs.dev](https://vitejs.dev)
3. Check React documentation: [react.dev](https://react.dev)

## License

This project is open source and available for modification and use.
"# benefits-presentation" 
