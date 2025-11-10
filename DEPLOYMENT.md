# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Nurtau/audio-graph`
2. Click on **Settings** (top menu)
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
5. That's it! GitHub Actions is now enabled.

#### Step 2: Merge to Main Branch

The deployment workflow is configured to run when code is pushed to the `main` branch.

**Option A: Merge your current branch**
```bash
# From your feature branch
git checkout main
git merge claude/audio-webapp-architecture-plan-011CV12BccSyahYG8AQr3DDa
git push origin main
```

**Option B: Create a Pull Request**
1. Go to GitHub repository
2. Click "Pull requests" → "New pull request"
3. Select your branch: `claude/audio-webapp-architecture-plan-011CV12BccSyahYG8AQr3DDa`
4. Create and merge the PR

#### Step 3: Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site will be live at:

   **https://nurtau.github.io/audio-graph/**

### Manual Deployment (Alternative)

If you prefer to deploy manually using gh-pages:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Push the `dist/` folder to the `gh-pages` branch

### Troubleshooting

**Workflow not running?**
- Make sure GitHub Actions is enabled in repository settings
- Check that you pushed to the `main` branch
- Look at the Actions tab for any errors

**404 Error on deployment?**
- Verify the base path in `vite.config.ts` is `/audio-graph/`
- Check that GitHub Pages source is set to "GitHub Actions"
- Wait a few minutes after deployment completes

**Permission errors?**
- Ensure GitHub Pages has write permissions:
  - Settings → Actions → General
  - Scroll to "Workflow permissions"
  - Select "Read and write permissions"

**Build failing?**
- Check the Actions log for specific errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles locally with `npm run build`

### Deployment Status

Check deployment status:
- **Actions tab**: See workflow runs
- **Environments**: See deployment history
- **Pages settings**: See current deployment URL

### Custom Domain (Optional)

To use a custom domain:

1. In GitHub Pages settings, add your custom domain
2. Update `vite.config.ts`:
   ```ts
   base: '/', // Remove the /audio-graph/ base for custom domains
   ```
3. Create a `CNAME` file in the `public/` directory with your domain
4. Rebuild and redeploy

### CI/CD Workflow

The deployment workflow (`.github/workflows/deploy.yml`) does the following:

1. **Build Job**:
   - Checks out code
   - Sets up Node.js 18
   - Installs dependencies
   - Builds the project
   - Uploads build artifacts

2. **Deploy Job**:
   - Takes the build artifacts
   - Deploys to GitHub Pages
   - Provides deployment URL

Every push to `main` triggers this workflow automatically!
