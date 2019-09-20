rm -r dist/
npm run build
docker build --no-cache --tag eso-build-backend .
docker-compose up -d