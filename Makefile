test:
	deno test --unstable -A ./src/**/*.spec.ts

build:
	deno bundle --unstable ./src/index.ts ./drone-gke.js

run:
	deno run --unstable -A ./drone-gke.js	

docker-build:
	docker build -t andrewmclagan/drone-gke:latest .
