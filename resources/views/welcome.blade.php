<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>InstantSearch.js Storefront</title>

        @vite('resources/js/app.js')
    </head>
    <body>
        <div class="container">
            <div class="search-panel">
                <div class="search-panel__filters">
                    <div class="brands"></div>
                </div>
                <div class="search-panel__results">
                    <div class="searchbox"></div>
                    <div class="hits"></div>
                    <div class="pagination"></div>
                </div>
            </div>
        </div>
    </body>
</html>
