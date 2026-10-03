#!/bin/zsh
PROJECT_DIR="/Users/danielsantander/Documents/MauleRed"
cd "$PROJECT_DIR" || exit 1

if ! lsof -i :5180 > /dev/null 2>&1; then
    npm run dev > /dev/null 2>&1 &
    sleep 2
fi

open "http://localhost:5180"
