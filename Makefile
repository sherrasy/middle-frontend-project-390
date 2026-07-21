.PHONY: install build start

install:
	cd code && npm i

build:
	cd code && npm run build

start:
	cd code && npx frontend-flight-booking-server start -s dist