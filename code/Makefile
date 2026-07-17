install:
	npm i

develop:
	npm run dev

build:
	npm run build

mock:
	npx @stoplight/prism-cli mock ../contract/openapi.yaml

test:
	APP_URL=$(APP_URL) npx vitest run tests/

start:
    npx frontend-flight-booking-server start -s dist