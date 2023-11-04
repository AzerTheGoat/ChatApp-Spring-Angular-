# Clean previously generated code
rm -rf e2etests/java/src/main
rm -rf e2etests/docs

# Generate Java client code
npx --package @openapitools/openapi-generator-cli openapi-generator-cli generate -p hideGenerationTimestamp=true -i serverapi.yaml -g java -o ./e2etests