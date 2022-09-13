<?php
$mock = json_decode(Storage::get('mock.json'), true);
?>

<x-layout>
  @push('scripts')
    @vite(['resources/css/home.css', 'resources/js/home.js'])
  @endpush

  <!-- Hero section -->
  <div class="relative">
    <!-- Background image and overlap -->
    <div aria-hidden="true" class="absolute inset-0 hidden sm:flex sm:flex-col">
      <div class="relative w-full flex-1 bg-black">
        <div class="absolute inset-0 overflow-hidden">
          <img src="/images/mark-chan-489jbTi51sg-unsplash-optimized.jpg" alt=""
            class="h-full w-full object-cover object-center">
        </div>
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div class="h-32 w-full bg-white md:h-40 lg:h-48"></div>
    </div>

    <div class="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
      <!-- Background image and overlap -->
      <div aria-hidden="true" class="absolute inset-0 flex flex-col sm:hidden">
        <div class="relative w-full flex-1 bg-black">
          <div class="absolute inset-0 overflow-hidden">
            <img src="/images/mark-chan-489jbTi51sg-unsplash-optimized.jpg" alt=""
              class="h-full w-full object-cover object-center">
          </div>
          <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
        </div>
        <div class="h-48 w-full bg-white"></div>
      </div>
      <div class="relative py-32">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Back-to-School Sale</h1>
        <div class="mt-4 sm:mt-6">
          <a href="{{ url('/search') }}"
            class="inline-block rounded-md border border-transparent bg-white py-3 px-8 font-medium text-black">Browse
            now</a>
        </div>
      </div>
    </div>

    <section aria-labelledby="collection-heading" class="relative -mt-96 sm:mt-0">
      <h2 id="collection-heading" class="sr-only">Categories</h2>
      <div
        class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
        @foreach ($mock['home']['categories'] as $category)
          <div class="group relative h-32 rounded-lg bg-white shadow-xl aspect-w-16 aspect-h-9 sm:h-auto">
            <div>
              <div aria-hidden="true" class="absolute inset-0 overflow-hidden rounded-lg">
                <div class="absolute inset-0 overflow-hidden group-hover:opacity-75">
                  <img src="{{ $category['imageSrc'] }}" alt=""
                    class="w-full h-auto object-center object-fit group-hover:scale-110 transition-transform {{ $category['className'] }}"
                    width="500" height="500">
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
              </div>
              <div class="absolute inset-0 flex items-end rounded-lg p-6">
                <div>
                  <p aria-hidden="true" class="text-sm text-white">Discover</p>
                  <h3 class="mt-1 font-semibold text-white">
                    <a href="#">
                      <span class="absolute inset-0"></span>
                      {{ $category['name'] }}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        @endforeach

      </div>
    </section>
  </div>

  <section aria-labelledby="trending-heading">
    <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
      <div class="md:flex md:items-center md:justify-between">
        <h2 id="favorites-heading" class="text-2xl font-bold tracking-tight text-gray-900">Trending Products</h2>
        <a href="{{ url('/search') }}" class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
          Browse now
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div id="trending-products" class="mt-6"></div>

      <div class="mt-8 text-sm md:hidden">
        <a href="{{ url('/search') }}" class="font-medium text-indigo-600 hover:text-indigo-500">
          Browse now
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</x-layout>
