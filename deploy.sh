rm -r dist/
npm run build
docker build . --tag eso-build-backend
docker-compose up -d