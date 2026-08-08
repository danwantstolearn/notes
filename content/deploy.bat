@echo off
title Deploy dggarden -> nqhaidang.com
echo ============================================
echo   Deploy Obsidian vault -> nqhaidang.com
echo ============================================
echo.
echo Kiem tra WSL dang chay...
wsl -e bash /home/nemo/deploy-dggarden.sh
echo.
echo ============================================
if %ERRORLEVEL% EQU 0 (
  echo  XONG. Mo https://nqhaidang.com de kiem tra
) else (
  echo  LOI - xem thong bao phia tren
)
echo ============================================
pause
