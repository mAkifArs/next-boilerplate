# How to Use This Boilerplate

This guide explains how to use this boilerplate as a starting point for new projects.

## Quick Start (3 Methods)

### Method 1: GitHub Template (Easiest) ⭐

1. **Make this repo a template:**
   - Go to your GitHub repo: `https://github.com/mAkifArs/next-boilerplate`
   - Click **Settings** → Scroll to **Template repository**
   - Check ✅ **Template repository**
   - Click **Save**

2. **Create new project:**
   - Go to the repo page
   - Click green **Use this template** button
   - Click **Create a new repository**
   - Name your new project
   - Clone it: `git clone <your-new-repo-url>`
   - `cd <project-name> && bun install && bun dev`

### Method 2: Clone and Rename

```bash
# Clone the boilerplate
git clone https://github.com/mAkifArs/next-boilerplate.git my-new-project
cd my-new-project

# Remove old git history
rm -rf .git

# Update package.json name (edit manually or use sed)
# Change "name": "next-boilerplate" to "name": "my-new-project"

# Initialize new repo
git init
git add .
git commit -m "Initial commit from boilerplate"

# Install and run
bun install
bun dev
```

### Method 3: Use the Setup Script

```bash
# From the boilerplate directory
chmod +x scripts/create-project.sh
./scripts/create-project.sh my-new-project

# Navigate to new project
cd ../my-new-project
bun install
bun dev
```

## What Gets Copied?

The script copies everything except:
- `.git/` - Old git history
- `node_modules/` - Dependencies (you'll install fresh)
- `.next/`, `out/`, `dist/`, `build/` - Build artifacts
- `coverage/` - Test coverage
- `.env.local`, `.env` - Environment files
- `bun.lockb` - Lock file (will be regenerated)

## After Creating New Project

1. **Update package.json:**
   - Change `name` field
   - Update `version` if needed
   - Update `description` if needed

2. **Update README.md:**
   - Change title and description
   - Update any project-specific info

3. **Update environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your environment variables

4. **Install dependencies:**
   ```bash
   bun install
   ```

5. **Start coding!**
   ```bash
   bun dev
   ```

## Tips

- Keep the boilerplate repo updated with improvements
- Use GitHub's template feature for the easiest workflow
- Consider creating a fork for personal customizations
- Document any changes you make to the boilerplate

