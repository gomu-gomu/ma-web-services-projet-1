#! /bin/sh

mkdir -p ./src/verbose/aos
mkdir -p ./src/verbose/gsap
mkdir -p ./src/verbose/chart.js
mkdir -p ./src/verbose/bootstrap
mkdir -p ./src/verbose/worldatlas
mkdir -p ./src/verbose/countup.js
mkdir -p ./src/verbose/particles.js

cp -R ./node_modules/aos/dist/* ./src/verbose/aos
cp -R ./node_modules/bootstrap/dist/* ./src/verbose/bootstrap
cp -R ./node_modules/chart.js/dist/chart.umd.js ./src/verbose/chart.js/chart.umd.js

cp ./node_modules/gsap/dist/Flip.min.js ./src/verbose/gsap/Flip.min.js
cp ./node_modules/gsap/dist/gsap.min.js ./src/verbose/gsap/gsap.min.js
cp ./node_modules/particles.js/particles.js ./src/verbose/particles.js/particles.js
cp ./node_modules/countup.js/dist/countUp.umd.js ./src/verbose/countup.js/countUp.umd.js
cp ./node_modules/world-atlas/countries-50m.json ./src/verbose/worldatlas/countries-50m.json
cp ./node_modules/chartjs-chart-geo/build/index.umd.min.js ./src/verbose/chart.js/index.umd.min.js