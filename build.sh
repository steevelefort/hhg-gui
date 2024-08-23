#!/bin/bash

npx neu update
cd hhkb-react || { echo "Failed to change directory to hhkb-react"; exit 1; }
npm install
npm run build
cd ..
npx neu build --release
