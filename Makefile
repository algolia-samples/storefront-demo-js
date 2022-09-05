#!/usr/bin/make

all: install start

## Install Composer and JavaScript dependencies
install:
	cp .env.example .env 2>/dev/null || :
	docker run --rm \
		-u "$$(id -u):$$(id -g)" \
		-v $$(pwd):/var/www/html -w /var/www/html \
		laravelsail/php81-composer:latest composer install --ignore-platform-reqs
	yarn install

start: ## Start the development environment
	$(MAKE) -j2 start_laravel start_vite

start_laravel:
	./vendor/bin/sail up

start_vite:
	sleep 5 && yarn dev
