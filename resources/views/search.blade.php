<?php
$filters = array(
  array( 'label' => 'Brand', 'attribute' => 'brand'),
  array( 'label' => 'Color', 'attribute' => 'color.original_name'),
  array( 'label' => 'Size', 'attribute' => 'available_sizes'),
  array( 'label' => 'Price range', 'attribute' => 'price.value')
);
?>

<x-layout>
  @push('scripts')
    @vite(['resources/css/search.css', 'resources/js/search.js'])
  @endpush

  <div class="mobile-filters-menu relative z-40 lg:hidden" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-black bg-opacity-25"></div>
    <div class="fixed inset-0 z-40 flex">
      <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
        <div class="flex items-center justify-between px-4">
          <h2 class="text-lg font-medium text-gray-900">Filters</h2>
          <button type="button"
            class="mobile-filters-menu-close-trigger -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x-mark -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4">
          @foreach ($filters as $filter)
          <div class="border-t border-gray-200 pt-4 pb-4">
            <fieldset>
              <legend class="w-full px-2">
                <button type="button"
                  class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                  aria-controls="filter-section-{{ $loop->index }}" aria-expanded="false">
                  <span class="text-sm font-medium text-gray-900">{{ $filter['label'] }}</span>
                  <span class="ml-6 flex h-7 items-center">
                    <svg class="rotate-0 h-5 w-5 transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
              </legend>
              <div class="px-4 pt-4 pb-2" id="filter-section-{{ $loop->index }}">
                <div id="filter-mobile-{{ str_replace('.', '', $filter['attribute']) }}"></div>
              </div>
            </fieldset>
          </div>
          @endforeach
        </div>
      </div>
    </div>
  </div>

  <div class="border-b border-gray-200">
    <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ol role="list" class="flex items-center space-x-4 py-4 border-t border-gray-200">
        <li>
          <div class="flex items-center">
            <a href="{{ url('/search') }}" class="mr-4 text-sm font-medium text-gray-900">Search</a>
          </div>
        </li>
      </ol>
    </nav>
  </div>

  <div class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
    <div class="pt-24 pb-10">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">Back-to-School Sale</h1>
      <p class="mt-4 text-base text-gray-500">Better than ever, and up to 30% off!</p>
    </div>
  </div>

  <div class="bg-gray-100 border-t border-gray-200">
    <div class="sm:flex sm:items-center mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="sm:order-2 p-3 sm:p-0 sm:flex-shrink-0">
        <div id="sortby"></div>
      </div>
      <div class="border-t border-gray-200 sm:border-0 flex-grow sm:flex sm:items-center">
        <h3 class="text-sm px-7 py-5 sm:p-0 flex-shrink-0 font-medium text-gray-500">
          Active filters
        </h3>
        <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"></div>
        <div id="no-filters-label" class="sm:mt-0.5 sm:h-16 flex items-center"></div>
        <div id="current-refinements" class="flex-grow"></div>
        <div id="clear-refinements" class="flex-shrink-0"></div>
      </div>
    </div>
  </div>

  <div class="mx-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
    <div class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 class="sr-only">Filters</h2>

        <button type="button" class="mobile-filters-menu-open-trigger inline-flex items-center lg:hidden">
          <span class="text-sm font-medium text-gray-700">Filters</span>
          <!-- Heroicon name: mini/plus -->
          <svg class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>

        <div class="hidden lg:block divide-y divide-gray-200 space-y-10">
          @foreach ($filters as $filter)
            <div class="{{ !$loop->first ? 'pt-10' : '' }}">
              <fieldset>
                <legend class="block text-sm font-medium text-gray-900">{{ $filter['label'] }}</legend>
                <div id="filter-desktop-{{ str_replace('.', '', $filter['attribute']) }}"></div>
              </fieldset>
            </div>
          @endforeach
        </div>
      </aside>

      <section aria-labelledby="product-heading" class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <h2 id="product-heading" class="sr-only">Products</h2>
        <div id="products"></div>
      </section>
    </div>
  </div>
</x-layout>
