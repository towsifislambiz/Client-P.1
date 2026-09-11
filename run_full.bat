@echo off
title Link BD ISP - Website & Admin Panel CMS
color 0b
echo ========================================================
echo        LINK BD INTERNET SERVICE PROVIDER
echo    Production Server and Public Website Launcher
echo ========================================================
echo.
echo [1/2] Starting Node.js Express CMS Backend Server (Port 5100)...
echo [2/2] Starting Vite React High-Speed Frontend (Port 5173)...
echo.
echo Website URL:      http://localhost:5173
echo Admin Panel URL:  http://localhost:5173/admin
echo API Health Check: http://localhost:5100/api/health
echo.
echo Press Ctrl+C anytime to stop both services.
echo ========================================================
echo.
call npm run dev:all
pause
