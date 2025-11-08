#!/bin/bash

# Script to create a new project from this boilerplate
# Usage: ./scripts/create-project.sh <project-name> [target-directory]

set -e

PROJECT_NAME=$1
TARGET_DIR=${2:-"../$PROJECT_NAME"}

if [ -z "$PROJECT_NAME" ]; then
  echo "❌ Error: Project name is required"
  echo "Usage: ./scripts/create-project.sh <project-name> [target-directory]"
  exit 1
fi

if [ -d "$TARGET_DIR" ]; then
  echo "❌ Error: Directory $TARGET_DIR already exists"
  exit 1
fi

echo "🚀 Creating new project: $PROJECT_NAME"
echo "📁 Target directory: $TARGET_DIR"
echo ""

# Get the boilerplate directory (parent of scripts)
BOILERPLATE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Copy all files except .git, node_modules, .next, etc.
echo "📋 Copying files..."
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='out' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='coverage' \
  --exclude='.env.local' \
  --exclude='.env' \
  --exclude='bun.lockb' \
  --exclude='.DS_Store' \
  "$BOILERPLATE_DIR/" "$TARGET_DIR/"

# Update package.json
echo "📝 Updating package.json..."
cd "$TARGET_DIR"
sed -i '' "s/\"name\": \"next-boilerplate\"/\"name\": \"$PROJECT_NAME\"/" package.json

# Initialize git
echo "🔧 Initializing git repository..."
git init
git add .
git commit -m "Initial commit from next-boilerplate template"

echo ""
echo "✅ Project created successfully!"
echo ""
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  bun install"
echo "  bun dev"
echo ""

