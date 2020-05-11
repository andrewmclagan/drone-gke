## Build

docker build -t andrewmclagan/drone-gke .

## Test

docker run --rm \
 -e PLUGIN_CLUSTER=test-cluster \
 -e PLUGIN_ZONE=asia-east1-a \
 -e PLUGIN_ARTEFACTS="src/**tests**/\_fixtures/kubernetes.yml" \
 -e DRONE_TAG=0.3.0 \
 -e DRONE_COMMIT=alskdalksdjlakjsdlaksd \
 andrewmclagan/drone-gke

docker run --rm \
 -e GKE_JSON_KEY="ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAidGVzdC1wcm9qZWN0IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiZ2IwY2FoOGJ4aDI0NWJiOTk2Y2ZiODEyMzMyZngzYjhqNzEyMzB4NzYiLAogICJwcml2YXRlX2tleSI6ICItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JOGo3MTJCQURBTkJna3Foa2k4ajcxMkFRRUZBQVNDQks4ajcxMmtBZ0VBQW9JQjhqNzEyQklwaE5Sck5EdXFcbmd3LzkzOGo3MTJGalVPQlFxY1JzOGo3MTJIUkJHbDR4VE83T2ZhWWdOY1JKTTV6eUkrWXJqQjE4cmJqUGVzTkdcbmFTTlBnZlFPcXI2YWRkLy9YMVdFUFFPYXFjOGo3MTJkTzdIUUZKNVlzUUhqMEJveVIveWJFVUZIMnpFM2c2aVxuMEpEVFpYKzhqNzEySUpZcVBkTzhjMTMwY2dvK3Y1cDBjaDNQMUpOdFRqUFhCNzNwN2ZOVmZRYlFvSXNhdjQ1dGpcbjFFSzcyOGo3MTJiMWJmMEZKVGluTlJOeXYveWlRdU1ZSS9BcWprTjhBUGp6OGo3MTJDTjRGOGxhc1ZhL2VmWVhuSU9cbng2YjQrdWEwREE1L3V2dGJHQS9FZWVQbHQrMHJhU3kwTFIzZVNIYXZvM3RldXFhejZYQTRpdTJ2N3VcbnVLWHNPVGRSQWdNQkE4ajcxMmdFQkFMalNCTWcxWDFqalArSWdiUVNIRG5RZ011RkQxNVFZaU9CQmpxWmVQMXRJXG5Wb1Q4ajcxMlk2QlR2Z0ZCeHkzL1pTeXp3OTJKRUg2blFoVUVBejhqSTVYaHR4RzBTTlg1VGpvYXVab01aNHp1XG41RVlYaDhqNzEyV1VVNnVFL2RUWU5Qd1BsMFZuWVpKUW54cTZHTm51RHBJOVlUWW1saVJudnhCXG5INTVTSkhZcDh4eXc3bloyeWZXUk9UK3BEdjkvcGQ4ajcxMit6Z2kwSDhlTUUxdkF2bG80bUNEYUJ1REtLUHJcbittcEhtTVM4MGRJbEhHTXo3L1EwSlFWV3VCTnZWejN4RzZHUmMwRmY4aWtlOGpJTXpiclY1U0Y0UUNzXG5YQ1FxdjRUeVoyQUEvR1EybWxMSjdKdjFLbk9QNTRlOGo3MTJSc1Zna0NnWUVBL0pRalVISkVyaC9DSkJuZVxuV1MvVFZucE1ZbVhxWEVQbGNlalBhTUlOWHRPN1c5MDdqWk1vZW9xTThNSG5FajBLWUxqZDhqNzEyUy9iK2h6aGZcbktqUWhDTlI2bmdFSUc2YXZmMFpOdmNZeitSK1BlaXRpVWdtREtHNjFac0Zhdzk2RVJCMzBaNDBnVmNrY2hcbnJFSVhwc1dHM1hjaU5oODhqNzEyMEdGdjJNQ2dZRUE3eUk2VEM0YUpOb0RseFpmazVYeUttMTRBNGxtZVpZNlxuRW52ZFJETHErWDRTbTcwZkxHajFnK0pVMjhFb0p6TUZzSHpGVUNwTTdxYWJtVStYRHFNMWU0eGpvQnJ0L0JFL1xueGdpNkJETkhMNDI5ay9SaWhhTGpWNjF3QzdXcktRT1JtRDRRQTYyaU8zNUt5d0dDdFFaU2JUSXg0M0NOQzFEMFxucFdRaGROOWxEcnNDZ1lCQnhhbTBoeTBQVXNIUmVOTUgwb1pzSElqTGp0S0ttRHVsZ0FTU3VRV1dUZmlhSVhBaVxubTlHTXA0dXdIaTQzOTZFK01xV2t4ZkIrVmFGT1FRVzNEY0FVZHBBL21QRXRraWhkTWtlVk9BL1JNZS85ZEg4OVxuRk0wSGJvRHkyQjlrNWc1TFRhd0xrUzR1bTFUS1gyK0xWZUttMFFVZm9xaE1BNnl3VVNSS294TmJGUUtCZ1FDblxuSUtuVDBpaXRkcjBwbkJaaVJGckNjazE5VTBzT1VRTDNKaUJuYUpxMmtma1paVnpqSWR2dE40S05MM3NMb21vb1xuaFpzMVFzc1B3OXRkazdXRUltYmZtU2VMbnlhU2s4K1piVUhzYTVZbDB3OGExNkwvdU83Z3VUTmt5NnY2OXlhTFxuVzF5LzVWdEw3eUVBcm1hV2MvdXBtM29vZGVIdGRiLzEwM3hhZlVMWXZ3S0JnRGlMWVYxbzVXdzVTNFM2REVJQ1xuWlZpWEJFd1R1WEI2NUtEMWYzTE1ocEZ2RmQ3L2RlalFBczdpSCtsNlJzRWJMbzRwenRLTXRrdkFvUlJBSTBNdlxuejFrNE9xeU1rQ3Q3VEMzS0hmLzdYdERCTUZSQXA0ZWdXOGo3MTJhWDhDbVBtN1Z6a0pOc2lOUXB5RG5cbklpZU9laTBaOGo3MTJSL2d6N2ltVUJcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJzZXJ2aWNlLWFjY291bnRAdGVzdC1wcm9qZWN0LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjExMTExMTExMTE4MzczNzIyMjIyMiIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L3NlcnZpY2UtYWNjb3VudCU0MHRlc3QtcHJvamVjdC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIKfQ==" \
 -e ARTEFACTS="src/__tests__/_fixtures/kubernetes.yml" \
 -e CLUSTER="" \
 -e ZONE="" \
 -e NAMESPACE="" \
 -e CONFIG_REPO="" \
 -e REPO_PUBLIC_KEY="" \
 -e REPO_PRIVATE_KEY="" \
 -e BRANCH="" \
 andrewmclagan/drone-gke
