<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ $title ?? 'Algolia Storefront' }}</title>
  @vite(['resources/css/bootstrap.css', 'resources/js/bootstrap.js'])
  @stack('scripts')
</head>

<body>
  <div class="bg-white">
    <div class="mobile-menu relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      <div class="fixed inset-0 z-40 flex">
        <div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div class="flex px-4 pt-5 pb-2">
            <button type="button"
              class="mobile-menu-close-trigger -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x-mark -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6 border-t border-gray-200 py-6 px-4">
            <div class="flow-root">
              <a href="#" class="-m-2 block p-2 font-medium text-gray-900">About us</a>
            </div>

            <div class="flow-root">
              <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sell</a>
            </div>

            <div class="flow-root">
              <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Help</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <header class="relative">
      <nav aria-label="Top">
        <div class="bg-white">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
              <div class="hidden h-full lg:flex lg:items-center">
                <div class="hidden lg:flex lg:flex-1 lg:items-center mr-4">
                  <a href="{{ url('/') }}">
                    <span class="sr-only">Algolia Storefront</span>
                    <img class="h-8 w-auto" src="/images/algolia-logo.png" alt="">
                  </a>
                </div>

                <div class="hidden h-full lg:flex">
                  <div class="inset-x-0 bottom-0 px-4">
                    <div class="flex h-full justify-center space-x-8">
                      <a href="#"
                        class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">About us</a>

                      <a href="#"
                        class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Sell</a>

                      <a href="#"
                        class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Help</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-1 items-center lg:hidden">
                <button type="button" class="mobile-menu-open-trigger -ml-2 rounded-md bg-white p-2 text-gray-400">
                  <span class="sr-only">Open menu</span>
                  <!-- Heroicon name: outline/bars-3 -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>

              <a href="{{ url('/') }}" class="lg:hidden">
                <span class="sr-only">Algolia Storefront</span>
                <img src="/images/algolia-logo.png" alt="" class="h-8 w-auto" />
              </a>

              <div class="flex flex-1 items-center justify-end">
                <div id="autocomplete" class="lg:w-4/6"></div>

                <div class="flex items-center ml-4 lg:ml-8">
                  <div class="flow-root">
                    <a href="#" class="group -m-2 flex items-center p-2">
                      <!-- Heroicon name: outline/shopping-bag -->
                      <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                      <span class="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      {{ $slot }}
    </main>

    <section aria-labelledby="perks-heading" class="border-t border-gray-200 bg-gray-50">
      <h2 id="perks-heading" class="sr-only">Our perks</h2>

      <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
        <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          <div class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img class="-my-1 mx-auto h-24 w-auto"
                  src="https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg" alt="">
              </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">Free returns</h3>
              <p class="mt-3 text-sm text-gray-500">Not what you expected? Place it back in the parcel
                and attach the pre-paid postage stamp.</p>
            </div>
          </div>

          <div class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img class="-my-1 mx-auto h-24 w-auto"
                  src="https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg" alt="">
              </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">Same day delivery</h3>
              <p class="mt-3 text-sm text-gray-500">We offer a delivery service that has never been done
                before. Checkout today and receive your products within hours.</p>
            </div>
          </div>

          <div class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img class="-my-1 mx-auto h-24 w-auto"
                  src="https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg" alt="">
              </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">All year discount</h3>
              <p class="mt-3 text-sm text-gray-500">Looking for a deal? You can use the code
                &quot;ALLYEAR&quot; at checkout and get money off all year round.</p>
            </div>
          </div>

          <div class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img class="-my-1 mx-auto h-24 w-auto"
                  src="https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg" alt="">
              </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">For the planet</h3>
              <p class="mt-3 text-sm text-gray-500">We’ve pledged 1% of sales to the preservation and
                restoration of the natural environment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer aria-labelledby="footer-heading" class="bg-gray-50">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-t border-gray-200 py-20">
          <div class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <img src="/images/algolia-logo.png" alt="" class="h-8 w-auto">
            </div>

            <div
              class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">About us</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Who are we?</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Phone comparison</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Careers</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Blog</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Guides & reviews</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Press</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Help</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Register to sell</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Seller portal</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Payments</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Delivery</a>
                    </li>

                    <li class="text-sm">
                      <a href="#" class="text-gray-500 hover:text-gray-600">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">Legal</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li class="text-sm">
                    <a href="#" class="text-gray-500 hover:text-gray-600">Terms of service</a>
                  </li>

                  <li class="text-sm">
                    <a href="#" class="text-gray-500 hover:text-gray-600">General terms &amp; conditions of sale</a>
                  </li>

                  <li class="text-sm">
                    <a href="#" class="text-gray-500 hover:text-gray-600">Data protection</a>
                  </li>

                  <li class="text-sm">
                    <a href="#" class="text-gray-500 hover:text-gray-600">Cookies</a>
                  </li>

                  <li class="text-sm">
                    <a href="#" class="text-gray-500 hover:text-gray-600">Legal notices</a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 class="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
              <p class="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox
                weekly.</p>
              <form class="mt-2 flex sm:max-w-md">
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" type="text" autocomplete="email" required
                  class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <div class="ml-4 flex-shrink-0">
                  <button type="submit"
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign
                    up</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">&copy; 2022 Algolia Storefront, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</body>

</html>
