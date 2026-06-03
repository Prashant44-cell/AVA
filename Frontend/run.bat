@echo off
REM Friday AI Assistant - Frontend Startup Script for Windows

echo =============================================
echo  Friday AI Assistant - Frontend Server
echo =============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

echo [INFO] Checking for required packages...

REM Check if Flask is installed
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo [SUCCESS] All dependencies are installed!
echo.
echo Starting Friday Assistant Frontend...
echo.
echo =========================================
echo Server will start on: http://localhost:5000
echo Open your browser and navigate to the URL above
echo Press Ctrl+C to stop the server
echo =========================================
echo.

python app.py

pause
