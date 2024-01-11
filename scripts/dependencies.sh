#! /bin/sh

mkdir -p ./src/verbose/chart.js
mkdir -p ./src/verbose/bootstrap
mkdir -p ./src/verbose/particles.js

cp -R ./node_modules/bootstrap/dist/* ./src/verbose/bootstrap
cp -R ./node_modules/chart.js/dist/chart.umd.js ./src/verbose/chart.js/chart.umd.js
cp ./node_modules/particles.js/particles.js ./src/verbose/particles.js/particles.js