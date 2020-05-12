test:
	deno test --unstable --allow-env --allow-run --allow-write --allow-read ./src/**/*.spec.ts

bundle:
	deno bundle --unstable ./src/index.ts  ./drone-gke.js

run:
	deno run --unstable --allow-env --allow-run --allow-write --allow-read ./drone-gke.js