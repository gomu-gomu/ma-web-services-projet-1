#! /bin/sh

mkdir -p ./src/verbose/bootstrap
mkdir -p ./src/verbose/particles.js

cp -R ./node_modules/bootstrap/dist/* ./src/verbose/bootstrap
cp ./node_modules/particles.js/particles.js ./src/verbose/particles.js/particles.js