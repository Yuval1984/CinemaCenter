@echo off
echo Building and deploying to GitHub Pages...
echo.

echo Step 1: Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)

echo.
echo Step 2: Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo Deployment failed!
    exit /b %errorlevel%
)

echo.
echo ========================================
echo Deployment completed successfully!
echo ========================================
pause

