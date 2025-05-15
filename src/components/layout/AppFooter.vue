<template>
  <footer class="bg-dark-900 border-t border-dark-800 py-8 mt-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo href="https://deduktionsspiele-nord.de" external class="mb-4" />
          <p class="text-sm text-light-500 mb-4">
            {{ $t('app.tagline') }}
          </p>
          <div class="flex space-x-4">
            <a href="https://twitter.com" class="text-light-500 hover:text-primary-400 transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://www.instagram.com/Deduktionsspiele.nord/" target="_blank" rel="noopener noreferrer" class="text-light-500 hover:text-primary-400 transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" aria-hidden="true" height="160" viewBox="0 0 160 160" width="160" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m80 0c4.1505 0 8.2271.31607 12.2072.925452l-1.1444 7.413248c-3.6069-.55226-7.3014-.8387-11.0628-.8387-3.7612 0-7.4555.28641-11.0623.83862l-1.1444-7.413245c3.9799-.609332 8.0564-.925375 12.2067-.925375z"/><path d="m98.9849 2.26619-1.7798 7.28755c7.3099 1.77896 14.1849 4.66606 20.4389 8.47306l3.895-6.411c-6.901-4.20091-14.488-7.38658-22.5541-9.34961z"/><path d="m127.279 15.4591-4.432 6.0507c5.977 4.3861 11.257 9.6664 15.643 15.6437l6.051-4.4324c-4.84-6.5957-10.666-12.4222-17.262-17.262z"/><path d="m148.384 38.4618-6.411 3.8942c3.807 6.2541 6.694 13.1299 8.473 20.4395l7.288-1.7798c-1.963-8.0657-5.149-15.6528-9.35-22.5539z"/><path d="m159.075 67.7934-7.414 1.1444c.553 3.6067.839 7.301.839 11.0622 0 3.7614-.286 7.4559-.839 11.0628l7.414 1.1444c.609-3.9801.925-8.0567.925-12.2072 0-4.1503-.316-8.2267-.925-12.2066z"/><path d="m141.973 117.645c3.807-6.255 6.694-13.13 8.473-20.44l7.288 1.7798c-1.963 8.0662-5.149 15.6532-9.35 22.5542z"/><path d="m138.49 122.847 6.051 4.432c-4.84 6.596-10.666 12.422-17.262 17.262l-4.433-6.051c5.978-4.386 11.258-9.666 15.644-15.643z"/><path d="m117.644 141.973 3.894 6.411c-6.901 4.201-14.488 7.387-22.5537 9.35l-1.7798-7.288c7.3095-1.779 14.1855-4.666 20.4395-8.473z"/><path d="m91.0622 151.661 1.1445 7.414c-3.9799.609-8.0564.925-12.2067.925-4.1505 0-8.2272-.316-12.2073-.925l1.1442-7.413c3.6054.552 7.2997.838 11.0631.838 3.7612 0 7.4555-.286 11.0622-.839z"/><path d="m62.7945 150.448-1.7794 7.286c-6.0589-1.475-11.8477-3.639-17.2785-6.406l-7.5927 1.772-1.7042-7.304 10.2604-2.394 2.4408 1.243c4.9187 2.506 10.1623 4.467 15.6536 5.803z"/><path d="m28.1097 147.273 1.7042 7.304-13.0145 3.036c-8.66079 2.021-16.433718-5.752-14.41286-14.412l3.03673-13.015 7.30383 1.704-3.03675 13.015c-.75782 3.248 2.15705 6.162 5.40485 5.405z"/><path d="m14.2041 125.56-7.30383-1.704 1.77163-7.593c-2.76664-5.431-4.93123-11.22-6.40585-17.2787l7.28586-1.7794c1.33599 5.4911 3.29709 10.7351 5.80279 15.6541l1.2435 2.441z"/><path d="m8.33759 91.0624-7.412228 1.1442c-.609324-3.9799-.925362-8.0563-.925362-12.2066 0-4.1505.316067-8.2271.925446-12.2072l7.413244 1.1444c-.55225 3.607-.83869 7.3014-.83869 11.0628 0 3.7631.28613 7.4572.83759 11.0624z"/><path d="m9.55373 62.795-7.28755-1.7798c1.96302-8.0657 5.1487-15.6528 9.34962-22.5539l6.411 3.8942c-3.807 6.2541-6.6941 13.1299-8.47307 20.4395z"/><path d="m21.5098 37.1531-6.0507-4.4324c4.8398-6.5957 10.6663-12.4221 17.262-17.2619l4.4324 6.0507c-5.9773 4.3861-11.2576 9.6663-15.6437 15.6436z"/><path d="m42.356 18.0266-3.8943-6.4111c6.9011-4.20082 14.4882-7.38645 22.554-9.34944l1.7798 7.28755c-7.3096 1.77899-14.1854 4.66589-20.4395 8.47299z"/><path d="m145 80c0 35.899-29.101 65-65 65-11.3866 0-22.0893-2.928-31.3965-8.072-.8961-.495-1.9417-.658-2.9389-.426l-28.9134 6.747 6.7465-28.914c.2326-.997.0692-2.043-.426-2.939-5.1439-9.307-8.0717-20.0095-8.0717-31.396 0-35.8985 29.1015-65 65-65 35.899 0 65 29.1015 65 65z"/></g></svg>
            </a>
            <a href="https://signal.group/#CjQKIGOLvCSe0ALLAmyULIALkz_5W5CdOFv7PPOuuZ4I8-HOEhBgixeUsC6VjRor2Ymw_0q7" target="_blank" rel="noopener noreferrer" class="text-light-500 hover:text-primary-400 transition-colors">
              <span class="sr-only">Signal Group</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="font-bold text-light-800 uppercase tracking-wider text-sm mb-4">{{ $t('footer.navigation') }}</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('nav.events') }}
              </router-link>
            </li>
            <li>
              <router-link to="/create-event" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('nav.createEvent') }}
              </router-link>
            </li>
            <li>
              <router-link to="/profile" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('nav.profile') }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-light-800 uppercase tracking-wider text-sm mb-4">{{ $t('footer.resources') }}</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://bloodontheclocktower.com/" target="_blank" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.officialSite') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.gameplayRules') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.characterGuides') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.storytellerResources') }}
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-light-800 uppercase tracking-wider text-sm mb-4">{{ $t('footer.about') }}</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.aboutUs') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-light-500 hover:text-primary-400 transition-colors text-sm">
                {{ $t('footer.contact') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-dark-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-light-600 mb-4 md:mb-0">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="text-sm text-light-600">
          {{ $t('footer.trademark') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Logo from '@/components/ui/Logo.vue';

const currentYear = computed(() => new Date().getFullYear());
</script>