#!/bin/bash
set -e

# Define root directory
ROOT_DIR=$(pwd)
DIST_DIR="$ROOT_DIR/dist"

echo "🚀 Starting deployment build..."

# Clean previous build
if [ -d "$DIST_DIR" ]; then
  echo "🧹 Cleaning previous build..."
  rm -rf "$DIST_DIR"
fi
mkdir -p "$DIST_DIR"
cp "$ROOT_DIR/CNAME" "$DIST_DIR/"

# 1. Build Homepage (Root)
echo "📦 Building Homepage..."
cd "$ROOT_DIR/homepage"
pnpm install
pnpm run build
cp -r dist/* "$DIST_DIR/"
echo "✅ Homepage built."

# 2. Build Gallery
echo "📦 Building Gallery..."
cd "$ROOT_DIR/gallery"
pnpm install
pnpm run build
mkdir -p "$DIST_DIR/gallery"
cp -r dist/* "$DIST_DIR/gallery/"
echo "✅ Gallery built."

# 3. Build Projects
echo "📦 Building Projects..."
cd "$ROOT_DIR/projects"
pnpm install
pnpm run build
mkdir -p "$DIST_DIR/projects"
cp -r dist/* "$DIST_DIR/projects/"
echo "✅ Projects built."

# 4. Build About
echo "📦 Building About..."
cd "$ROOT_DIR/about"
pnpm install
pnpm run build
mkdir -p "$DIST_DIR/about"
# Ensure we copy from the correct demo output
if [ -d "demo/dist" ]; then
  cp -r demo/dist/* "$DIST_DIR/about/"
else
  echo "⚠️ Warning: About demo/dist not found!"
fi
echo "✅ About built."

echo "🎉 All projects built successfully!"
echo "📂 Output directory: $DIST_DIR"
