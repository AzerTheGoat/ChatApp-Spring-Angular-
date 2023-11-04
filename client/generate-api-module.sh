# Generate Java client code
npx --package @openapitools/openapi-generator-cli openapi-generator-cli generate -p hideGenerationTimestamp=true -i ../api/serverapi.yaml -g typescript-angular -o ./src/app/api


