
## Build
docker build -t andrewmclagan/drone-gke .

## Test
docker run --rm \
	-e PLUGIN_CLUSTER=test-cluster \
	-e PLUGIN_ZONE=asia-east1-a \
	-e PLUGIN_ARTEFACTS="src/__tests__/_fixtures/kubernetes.yml" \
	-e DRONE_TAG=0.3.0 \
	-e DRONE_COMMIT=alskdalksdjlakjsdlaksd \
  andrewmclagan/drone-gke