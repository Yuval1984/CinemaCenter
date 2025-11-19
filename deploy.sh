#!/bin/bash

echo "Building and deploying to GitHub Pages..."
echo ""

echo "Step 1: Building the project..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo ""
echo "Step 2: Deploying to GitHub Pages..."
npm run deploy
if [ $? -ne 0 ]; then
    echo "Deployment failed!"
    exit 1
fi

echo ""
echo "========================================"
echo "Deployment completed successfully!"
echo "========================================"

