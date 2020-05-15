test:
	deno test --unstable --allow-env --allow-run --allow-write --allow-read ./src/**/*.spec.ts

build:
	deno bundle --unstable ./src/index.ts  ./drone-gke.js

run:
	deno run --unstable --allow-env --allow-run --allow-write --allow-read ./drone-gke.js	

docker-build:
	docker build -t andrewmclagan/drone-gke:latest .

docker-run:
	docker run --env-file=.env andrewmclagan/drone-gke:latest