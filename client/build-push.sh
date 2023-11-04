IMAGE=eu.gcr.io/mightycode/cpoo_client
npm install
npm run build
docker build . -t $IMAGE
docker push $IMAGE
