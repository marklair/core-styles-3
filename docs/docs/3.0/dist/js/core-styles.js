(function () {
  'use strict';

  // NOTE: this file must be loaded **before** ahoy.js. Don't use jQuery or any other lib that requires an object to execute before the code executes.

  (function(webstop, ahoy){
    function getConfigValue(name){
      let value = '';
      if (name && document.body.hasAttribute(name)){ value = document.body.getAttribute(name);}
      return value
    }
    let retailerID  = getConfigValue('data-retailer-id');
    let apiHost     = getConfigValue('data-api-host');
    let webHost     = getConfigValue('data-web-host');
    let storeNumber = getConfigValue('data-store-number');

    webstop.retailerID  = retailerID;
    webstop.apiHost     = apiHost;
    webstop.webHost     = webHost;
    webstop.storeNumber = storeNumber;

    ahoy.visitParams   = {retailer_id: retailerID, store_number: storeNumber};
    ahoy.visitsUrl     = apiHost + "/api/v1/retailers/" + retailerID + "/aye/visit.json";
    ahoy.eventsUrl     = apiHost + "/api/v1/retailers/" + retailerID + "/aye/event.json";

  })( window.webstop = window.webstop || {},  window.ahoy = window.ahoy || {} );

  // Using the following design pattern
  // https://web.archive.org/web/20181005005954/https://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/


  // Live
  (function( webstop ) {

    // Public Method live();
    // Live allows you to perform an action when elements are added to the DOM tree.
    // This was developed to help add event listeners to DOM elements after they were added via AJAX or fetch.
    // It also works on DOM elements added via straight Javascript.
    //
    // NOTE: MutationObserver will execute the callback "perform" function immediately when live is instantiated.
    //       This can cause some unexpected behavior if you aren't aware for it and design for it in your supplied
    //       callback function (supplied to the perform parameter).
    //
    // Parameters:
    //   @parent: the parent DOM node to watch, blank or null defaults to document.body
    //   @perform: the function to execute in the callback
    webstop.live = function(perform, parent= 'body',) {
      // Private Properties
      let parents; // found DOM elements, based on parent selector
      const config = {
        childList: true,
        subtree: true
      };

      // Callback function to execute when mutation is observed

      let callback = function(mutationsList, observer) {
        let hasNodesAdded = false;
        for(let mutation of mutationsList) {
          if(mutation.type === 'childList') { // We're only interested in child nodes being added or removed
            hasNodesAdded = true;
          }
        }
        if(hasNodesAdded){
          perform();
        }
      };

      if (typeof parent === "string" && parent.trim().length > 0) ; else {
        parent ='body';
      }

      parents = document.querySelectorAll(parent);

      if (parents.length > 0) {
        parents.forEach((container) => {
          let observer = new MutationObserver(callback);
          observer.observe(container, config);
        });
      }
    };

  })( window.webstop = window.webstop || {} );

  (function(cs3){

    function setCookie(name, value, expireDays) {
      const d = new Date();
      let expires = '';
      if(expireDays) {
        d.setTime(d.getTime() + (expireDays*24*60*60*1000));
        expires = "expires=" + d.toUTCString() + ';';
      }
      document.cookie = name + "=" + value + ";" + expires + "path=/";
    }

    function getCookie(name) {
      let nameEquals = name + "=";
      let ca = document.cookie.split(';');
      for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEquals) == 0) return c.substring(nameEquals.length,c.length);
      }
      return null;
    }

    function checkCookie(name) {
      let cookie = getCookie(name);
      return !!cookie;
    }

    cs3.setCookie   = setCookie;
    cs3.getCookie   = getCookie;
    cs3.checkCookie = checkCookie;

  })( window.cs3 = window.cs3 || {} );

  // Ajax Form Component
  $(function() {

    $(document.body).on('submit', '[data-ajax-form]', function(event){
      event.preventDefault();

      let $this = $(this);
      let url = $this.attr('action');
      let method = $this.attr('method') || 'POST';
      let data = $this.serializeArray();
      let $target = $this;
      let $submitButtons = $this.find('[type="submit"], button[type="submit"], input[type="submit"]');
      let loadingText = $this.data('loading-text') || 'Loading…';
      let hasHideOnComplete = $this.is('[data-on-complete-hide]');
      let hideOnCompleteTarget = '';
      if(hasHideOnComplete){ hideOnCompleteTarget = $this.data('on-complete-hide'); }
      let hasClearOnComplete = $this.is('[data-on-complete-clear]');
      let clearOnCompleteTarget = '';
      if(hasClearOnComplete){ clearOnCompleteTarget = $this.data('on-complete-clear'); }
      let hasShowOnComplete = $this.is('[data-on-complete-show]');
      let showOnCompleteTarget = '';
      if(hasShowOnComplete){ showOnCompleteTarget = $this.data('on-complete-show'); }
      let hasLoadOnComplete = $this.is('[data-on-complete-load]');
      let loadOnCompleteURL = '';
      let loadOnCompleteTarget = '';
      if(hasLoadOnComplete){
        loadOnCompleteURL = $this.data('on-complete-load');
        loadOnCompleteTarget = $this.data('on-complete-target');
      }
      const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
      if (!validMethods.includes(method.toUpperCase())) {
        method = 'POST';
      }
      $submitButtons.each(function() {
        let $btn = $(this);
        // submit inputs use val and submit buttons use text.
        if ($btn.is('input')) {
          $btn.data('original-text', $btn.val());
          $btn.val(loadingText);
        } else {
          $btn.data('original-text', $btn.html());
          $btn.text(loadingText);
        }
        $btn.prop('disabled', true);
      });

      if( $this.is('[data-target]') ){
        $target = $($this.data('target'));
      } else {
        if($this.parent().is('.ajax-form-container')) ;  else {
          $this.wrap( "<div class='ajax-form-container'></div>" );
        }
        $target = $this.parent();
      }
      $submitButtons.prop('disabled', true);

      $target.load(url,data,function(){
        $submitButtons.each(function() {
          let $btn = $(this);
          let originalText = $btn.data('original-text');
          if ($btn.is('input')) {
            $btn.val(originalText);
          } else {
            $btn.html(originalText);
          }
          $btn.prop('disabled', false);
        });
        if(hasClearOnComplete){ clearOnComplete(clearOnCompleteTarget); }
        if(hasHideOnComplete){ hideOnComplete(hideOnCompleteTarget); }
        if(hasShowOnComplete){ showOnComplete(showOnCompleteTarget); }
        if(hasLoadOnComplete){ loadOnComplete(loadOnCompleteURL, loadOnCompleteTarget); }
      });


    });

    function hideOnComplete(hideOnCompleteTarget) {
      const targets = document.querySelectorAll(hideOnCompleteTarget);

      targets.forEach(target => {
        target.style.display = 'none';
      });

    }

    function clearOnComplete(clearOnCompleteTarget) {
      const targets = document.querySelectorAll(clearOnCompleteTarget);

      targets.forEach(target => {
        target.innerHTML = '';
      });

    }
    function showOnComplete(showOnCompleteTarget) {
      const targets = document.querySelectorAll(showOnCompleteTarget);

      targets.forEach(target => {
        // Remove d-none class if present
        target.classList.remove('d-none');

        // Set display to block with !important
        target.style.setProperty('display', 'block', 'important');
      });

    }

    function loadOnComplete(loadOnCompleteURL, loadOnCompleteTarget) {
      const targets = document.querySelectorAll(loadOnCompleteTarget);
      // console.log(`loadOnComplete`);
      // console.log(`loadOnCompleteURL: ${loadOnCompleteURL}`);
      // console.log(`loadOnCompleteTarget: ${loadOnCompleteTarget}`);

      return fetch(loadOnCompleteURL, {credentials: 'include', headers: {'X-Requested-With': 'fetch'}})
        .then(response => {
          if (!response.ok) {
            // Create a more detailed error message based on status code
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

            switch (response.status) {
              case 404:
                errorMessage += ' - The requested resource was not found';
                break;
              case 500:
                errorMessage += ' - Internal server error occurred';
                break;
              case 403:
                errorMessage += ' - Access forbidden';
                break;
              case 401:
                errorMessage += ' - Authentication required';
                break;
              default:
                errorMessage += ' - Request failed';
            }

            throw new Error(errorMessage);
          }
          return response.text();
        })
        .then(html => {
          targets.forEach(target => {
            console.log(`Apply on complete to target.`);
            target.innerHTML = html;
          });
        })
        .catch(error => {
          console.error('Error loading on-complete content:', error.message);

          // Log additional context for debugging
          console.error('Request details:', {
            url: loadOnCompleteURL,
            method: method,
            target: loadOnCompleteTarget
          });
        });
    }

  });

  // Adds default data attribute support to components that are missing it from Bootstrap.

  function initPopovers() {
    $('[data-toggle="popover"]').popover();
    // Bootstrap v5 switched to adding the bs namespace to their data attributes.
    $('[data-bs-toggle="popover"]').popover();
  }

  function initTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
    // Bootstrap v5 switched to adding the bs namespace to their data attributes.
    $('[data-bs-toggle="tooltip"]').tooltip();
  }

  function initDataAttributes() {
    initPopovers();
    initTooltips();
  }

  $(function() {
    initDataAttributes();
  });

  $(function() {

    $(document.body).on('click', '[data-ajax-load]', function(event){
      let $this = $(this);
      let url = $this.data('load');
      let $target = $this;
      $this.is('[data-power-bar]');
      let hasOnComplete = $this.is('[data-on-complete-load]');
      let onCompleteUrl = '';
      let onCompleteTarget = '';
      if(hasOnComplete){
        onCompleteUrl = $this.data('on-complete-load');
        onCompleteTarget = $this.data('on-complete-target');
      }

      if( $this.is('[data-target]') ){
        $target = $($this.data('target'));
      } else {
        if($this.parent().is('.ajax-form-container')) ;  else {
          $this.wrap( "<div class='ajax-form-container'></div>" );
        }
        $target = $this.parent();
      }

      if( $this.is('[data-disable-loading-indicator]') ) ; else {
        if( $this.is('input[type="submit"]') ) {
          $this.val('Loading…');
        } else {
          $this.text('Loading…');
        }
        if( $this.is('button') || $this.is('input[type="submit"]') ) { $this.prop('disabled', true); }
      }

      $target.load(url,function(){
        if(hasOnComplete){ loadOnComplete(onCompleteUrl, onCompleteTarget); }
      });

    });

  });


  // Vanilla JS Version
  function load$1(target, url, infinite) {
    // TODO: Add callback support, success and failure callbacks
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'fetch',
      },
    })
      .then(function(response) { return response.text(); })
      .then(function(body) { target.innerHTML = body; })
      .then(function() { if(infinite){
        let pagingTrigger = target.querySelector('.paging-trigger');
        if (pagingTrigger) { pagingObserver.observe(pagingTrigger); }
        enableNextLoadOnView(target);
        initDataAttributes();
      } });
  }

  function loadOnView(target, url, infinite) {

    const observer = new IntersectionObserver((entries) => {

      if(entries[0].intersectionRatio !== 0) {
        // Element enters the viewport
        if(!entries[0].target.classList.contains('is-loaded')) {
          // Element has not been loaded yet
          load$1(target, url, infinite);
          let skipHistory = entries[0].target.hasAttribute('data-skip-history');
          if(!skipHistory) { history.pushState(null, "", url); }
          entries[0].target.classList.add('is-loaded');
        }

      }

    });
    observer.observe(target);
  }


  function enableNextLoadOnView(current){
    let targets = document.querySelectorAll('[data-load-on-view]');
    let foundCurrent = false;
    let foundNext = false;
    let loaded = false;
    targets.forEach((target) => {
      loaded = target.classList.contains('is-loaded');
      if((foundCurrent && !foundNext) || loaded) {
        let display = target.getAttribute('data-display-as');
        display = display || 'block';
        target.style.display = display;
        if(!loaded){foundNext = true;}    } else {
        target.style.display = 'none';
      }
      if(target == current){foundCurrent = true;}
    });
  }

  // Paging

  const pagingObserver = new IntersectionObserver(entries => {

    // Element enters the viewport
    if(entries[0].intersectionRatio !== 0) {
      let parent = entries[0].target.closest('[data-page-number]');
      if(parent) { updatePaging(parent); }
    }

  });


  function updatePaging(source) {
    // TODO: Add callback support, success and failure
    //let target = document.querySelector(selector);
    let maxPageNumber = source.getAttribute('data-max-page-number');
    let pageNumber = source.getAttribute('data-page-number');
    let selector = '';
    if(source.hasAttribute('data-paging')) {
      selector = source.getAttribute('data-paging');
    }

    if(!selector) {
      selector = '.paging';
    }

    let targets = document.querySelectorAll(selector);

    targets.forEach((target) => {
      let currentPage = target.querySelector('.paging-current-page');
      let pages = target.querySelectorAll('.paging-page');
      let html = `
      <span class="d-none d-sm-inline">Page ${pageNumber} of ${maxPageNumber}</span>
      <span class="d-inline d-sm-none">Pg. ${pageNumber}</span>
    `;
      if(currentPage) { currentPage.innerHTML = html; }
      let url = source.getAttribute('data-load-on-view');
      if(!url){url = source.getAttribute('data-url');}
      pages.forEach((page) => {
        if(page.getAttribute('href') == url){
          page.classList.add('active');
        } else if(page.classList.contains('active')){
          page.classList.remove('active');
        }
      });
    });
  }

  function loadOnComplete(onCompleteUrl, onCompleteTarget) {
    const targets = document.querySelectorAll(onCompleteTarget);
    console.log(`loadOnComplete`);
    console.log(`onCompleteUrl: ${onCompleteUrl}`);
    console.log(`onCompleteTarget: ${onCompleteTarget}`);

    return fetch(onCompleteUrl, {credentials: 'include', headers: {'X-Requested-With': 'fetch'}})
      .then(response => response.text())
      .then(html => {
        targets.forEach(target => {
          console.log(`Apply on complete to target.`);
          target.innerHTML = html;
        });
      })
      .catch(error => console.error('Error loading on-complete content:', error));
  }


  // IIFE (Immediately Invoked Function Expression)
  (() => {
    // Vanilla JS version of Data Attribute DSL
    let targets = document.querySelectorAll('[data-load-on-view]');
    let count   = 0;
    if(targets.length !== 0) {
      targets.forEach((target) => {
        let url      = target.getAttribute('data-load-on-view');
        let infinite = target.hasAttribute('data-infinite-scroll');
        let display  = target.getAttribute('data-display-as');
        let show  = target.hasAttribute('data-show');
        let loaded   = target.classList.contains('is-loaded');
        display = display || 'block';
        // count == 0 || loaded ? display = display : display = 'none';
        if(count != 0 && !loaded && !show){display = 'none';}
        target.style.display = display;
        loadOnView(target, url, infinite);
        count++;
      });
      // Register any triggers on the initial page, not just the one's loaded via ALAX
      let pagingTrigger = document.querySelector('.paging-trigger');
      if(pagingTrigger) { pagingObserver.observe(pagingTrigger); }
    }
  })();

  (() => {
    // Vanilla JS version of Data Attribute DSL
    let targets = document.querySelectorAll('[data-load-now]');
    if(targets.length !== 0) {
      targets.forEach((target) => {
        let url      = target.getAttribute('data-load-now');
        load$1(target, url, false);
      });
    }

  })();

  // Ajax Modal Component

  $(function() {
    // Resets modal once closed
    $(document.body).on('hidden.bs.modal', '#site-modal', function () {
      $('#site-modal-title').text('');
      $('#site-modal-body').html('<div class="text-center"><div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status"></div><H4>Loading…</H4></div>');
      $('#site-modal-footer').removeClass('d-none');
    });

    // Load on modal close. Main use case is reloading the shopping list sidebar when items are edited or added.
    $(document.body).on('hide.bs.modal', '#site-modal', function () {
      console.log('hide');
      $('[data-load-on-modal-close]').each(function(){
        $(this).load($(this).attr('data-load-on-modal-close').replace(/&amp;/g, '&'));
      });
    });

    $(document.body).on('show.bs.modal', '#site-modal', function (event) {
      let trigger = event.relatedTarget;
      let $trigger = $(event.relatedTarget);
      let title = $trigger.attr('data-title');
      let url = $trigger.attr('data-load');
      let content = $trigger.attr('data-content');
      let footer = $trigger.attr('data-footer');
      let storeFormPicker = $trigger.is('[data-store-form-picker]');
      if(footer == 'hide'){
        $('#site-modal-footer').addClass('d-none');
      }
      $('#site-modal-title').text(title);
      if(content){
        $('#site-modal-body').html(content);
      }
      if(url){
        $('#site-modal-body').load(url, function(){
          // special features
          if(storeFormPicker){
            // Sets store form picker when initial store locator list loads
            webstop.stores.formPicker(trigger);
            // Resets store form picker when new content loads into the store locator results list
            let storesListing = document.querySelector('#stores-search-results');
            let storesListingObserver = new MutationObserver(function(){webstop.stores.formPicker(trigger);});
            storesListingObserver.observe(storesListing, { attributes: false, childList: true, subtree: false });
          }
        });
      }
    });

  });

  // Disable buttons


  const clickDisableButtons = document.querySelectorAll("[data-disable-on-click]");

  clickDisableButtons.forEach(btn=>{
    btn.addEventListener('click', function(event){
      event.target.disabled  = true;
      event.target.innerHTML = 'Loading…';
      event.target.value     = 'Loading…';
    });
  });

  const submitDisableButtons = document.querySelectorAll("[data-disable-on-submit]");

  submitDisableButtons.forEach(btn=>{
    btn.addEventListener('submit', function(event){
      event.target.disabled  = true;
      event.target.innerHTML = 'Loading…';
      event.target.value     = 'Loading…';
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
      const trigger = e.target.closest('.card-flipper-trigger');

      if (trigger) {
        e.stopPropagation();
        const card = trigger.closest('.card-flipper');

        if (card) {
          card.classList.toggle('card-flipper-is-flipped');
        }
      }
    });
  });

  // Checkbox Selector Component

  $(function() {


    // The button should be in the `select` state if there are more unchecked checkboxes than checked,
    // if there are not more unchecked than checked it should be in the `unselect` state
    function update_status(context){
      let group = $(context).attr('data-check-selector-group');
      let checked = 0;
      let unchecked = 0;

      console.log('Checkbox Changed!');

      // check state of all checkboxes in the group
      $(`input[type="checkbox"][data-check-selector-group="${group}"]`).each(function(index){
        if($(this).prop('checked')) {
          checked += 1;
        } else {
          unchecked += 1;
        }
      });

      if( checked <= unchecked ) {
        select(group);
      } else {
        unselect(group);
      }
    }

    function select(group){
      console.log('Change button to select.');
      $(`[data-check-selector-for="${group}"]`).removeClass('is-unselect');
      $(`[data-check-selector-for="${group}"]`).addClass('is-select');
      $(`[data-check-selector-for="${group}"]`).attr('data-check-selector-state', 'select');
    }

    function unselect(group){
      console.log('Change button to unselect.');
      $(`[data-check-selector-for="${group}"]`).removeClass('is-select');
      $(`[data-check-selector-for="${group}"]`).addClass('is-unselect');
      $(`[data-check-selector-for="${group}"]`).attr('data-check-selector-state', 'unselect');
    }

    // Check and update the button status everytime a checkbox is checked or unchecked
    $('input[type="checkbox"][data-check-selector-group]').on('change', function(){
      update_status(this);
    });

    $('input[type="checkbox"][data-check-selector-group]').each(function(){
      update_status(this);
    });



    // If a select/unselect button is clicked, make the grouped checkboxes checked/unchecked.
    $(document.body).on('click', '[data-check-selector-for]', function(event){
      event.preventDefault();

      let $button = $(this);
      let group = $button.attr('data-check-selector-for');
      let state = $button.attr('data-check-selector-state');

      if(state == 'select'){
        $(`input[type="checkbox"][data-check-selector-group="${group}"]`).prop('checked', true);
        unselect(group);
      } else {
        $(`input[type="checkbox"][data-check-selector-group="${group}"]`).prop('checked', false);
        select(group);
      }

    });

  });

  // Filter Search

  // Waits for page to load.
  window.addEventListener("load", function(){
    // Attaches event listener to the search field.
    // TODO: Update this to handle more than one search per-page, probably using querySelectorAll.
    let searchField = document.querySelector("input[data-filter-search]");
    if(searchField){
      searchField.addEventListener("keyup", function(){
        // Get the search string
        let search = this.value.toLowerCase();
        // Get the list of elements to search through.
        let selector = this.getAttribute('data-filter-selector');
        let items = document.querySelectorAll(selector);

        // Loop through the items and only show those that match the search terms.
        for (let i of items) {
          let item = i.innerHTML.toLowerCase();
          if (item.indexOf(search) == -1) {
            i.classList.add("d-none"); // Assumes we have Bootstrap CSS class `d-none` available.
          } else {
            i.classList.remove("d-none");
          }
        }
      });
    }

  });

  // Form Toggle Component

  $(function() {

    $(document.body).on('change', '[data-form-toggle-trigger]', function(event){
      let $this   = $(this);
      let name    = $this.attr('name');
      let tag     = $this.prop('tagName');
      let control = ''; // possible values 'select', 'checkbox', or 'radio'

      // Find control
      if(tag == 'SELECT'){
        control = 'select';
      } else if (tag == 'INPUT'){
        let input_type = $this.attr('type');
        if(input_type == 'CHECKBOX' || input_type == 'checkbox') {
          control = 'checkbox';
        } else if(input_type == 'RADIO' || input_type == 'radio'){
          control = 'radio';
        }
      }

      // Perform toggle
      if(control == 'select' || control == 'radio') {
        let value = this.value;
        let show = false;

        $(`[data-form-toggle*='${name}']`).each(function() {

          if($(this).attr('data-form-toggle-match') == 'exact'){
            show = $(this).attr('data-form-toggle-show-for') == value;
          } else {
            show = $(this).attr('data-form-toggle-show-for').includes(value);
          }

          if(show){
            $(this).removeClass('d-none');
          } else {
            $(this).addClass('d-none');
          }
        });
      } else if(control == 'checkbox') {
        $(`[data-form-toggle='${name}']`).toggleClass('d-none');
      }

    });

  });

  // Using the following design pattern
  // https://web.archive.org/web/20181005005954/https://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/


  // Geolocation
  (function( webstop ) {

    // Private Properties
    let message; // element (where to display error messages)
    let trigger; // element
    let target; // element
    let hide_trigger = true;
    let locate_on_load = false;
    let action_url = '';
    let has_action_url = false;
    let filter = '';
    let has_filter = false;
    let main_action = '';
    let has_main_action = false;
    let redirect_url = '';
    let has_redirect_url = false;

    // Public Properties
    // Public Properties would take the form webstop.locator.someProperty = '';

    // Public Sub-Class
    webstop.locator = {};

    // Private Method locate();
    webstop.locator.locate = function(display_messages) {
      display_messages = !!(display_messages && message);

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const default_action_url = `${window.webstop.webHost}/retailers/${window.webstop.retailerID}/stores?display=results-only&latitude=${latitude}&longitude=${longitude}`;
        action_url = action_url || default_action_url;
        if(action_url == ''){ action_url = default_action_url; }
        if(filter != ''){ action_url += `&filter=${filter}`; }
        if(main_action != ''){ action_url += `&main_action=${main_action}`; }
        if(redirect_url != ''){ action_url += `&url=${redirect_url}`; }
        load(target, action_url);
        if(display_messages){ message.textContent = ''; }
        if(hide_trigger){ trigger.classList.add('d-none'); }
      }

      function error(error) {
        if(display_messages){ message.textContent = `Unable to retrieve your location.`; }
        console.error(`Geolocation Error. Code: ${error.code}. Message: ${error.message}`);
      }

      if(!navigator.geolocation) {
        if(display_messages){ message.textContent = "Geolocation is not supported by your browser."; }
      } else {
        if(display_messages){ message.textContent = 'Locating…'; }
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };

    // Public Method webstop.locator.watcher
    webstop.locator.watcher = function() {
      trigger = document.querySelector("[data-locate]");
      if (trigger) {
        target = document.querySelector(trigger.getAttribute('data-locate-target'));
        message = document.querySelector(trigger.getAttribute('data-locate-message'));
        hide_trigger = trigger.hasAttribute('data-locate-hide-me');
        locate_on_load = trigger.hasAttribute('data-locate-on-load');
        has_action_url = trigger.hasAttribute('data-locate-action-url');
        if (has_action_url) {
          action_url = trigger.getAttribute('data-locate-action-url');
        }
        has_filter = trigger.hasAttribute('data-locate-filter');
        if (has_filter) {
          filter = trigger.getAttribute('data-locate-filter');
        }
        has_main_action = trigger.hasAttribute('data-locate-main-action');
        if (has_main_action) {
          main_action = trigger.getAttribute('data-locate-main-action');
        }
        has_redirect_url = trigger.hasAttribute('data-locate-redirect-url');
        if (has_redirect_url) {
          redirect_url = trigger.getAttribute('data-locate-redirect-url');
        }
        trigger.addEventListener("click", function (event) {
          webstop.locator.locate(true);
        });
        // the following runs locate on page load, but without hiding the Use My Location button.
        if(locate_on_load){
          webstop.locator.locate(false);
        }
      }
    };
  })( window.webstop = window.webstop || {} );

  (() => {

    const pxPerRow = 24; // 24 pixels per row (a textarea row)
    const editorVersion = '3.2.2'; // Toast UI Editor Version Number

    function getConfig(textarea) {
      let pixels = 0;
      let content = textarea.value;
      let height = '300px';
      let mode = 'wysiwyg'; // Accepts `wysiwyg`, `markdown`, or `split-pane`.
      let previewStyle = 'tab'; // Accepts 'tab' or 'vertical'.
      let initialEditType = 'wysiwyg';
      let toolbarAttr = textarea.getAttribute('data-editor-toolbar');
      let toolbarItems = [
        ['heading', 'bold', 'italic'],
        ['ul', 'ol'],
        ['hr', 'table', 'image', 'link']
      ];

      // Standard is the default and therefore isn't checked
      if (toolbarAttr === 'basic') {
        toolbarItems = [
          ['heading', 'bold', 'italic', 'link']
        ];
      } else if (toolbarAttr === 'full') {
        toolbarItems = [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ];
      }

      console.log('Textarea Value in getConfig:');
      console.log(content);

      if (textarea.hasAttribute('data-editor-height')) {
        pixels = Number(textarea.getAttribute('data-editor-height'));

      } else if (textarea.hasAttribute('rows')) {
        let rows = Number(textarea.getAttribute('rows'));
        pixels = rows * pxPerRow; // 24 pixels per row
      }

      if (pixels >= 72) { // must have at least 3 rows
        pixels += 75; // for editor toolbar and chrome
        height = pixels+ 'px';
      }

      if (textarea.hasAttribute('data-editor-mode')) {
        mode = textarea.getAttribute('data-editor-mode');
        if (mode === 'wysiwyg') {
          // Same as default behavior
          initialEditType = 'wysiwyg';
          previewStyle = 'tab';
        } else if (mode === 'markdown') {
          initialEditType = 'markdown';
          previewStyle = 'tab';
        } else if (mode === 'split-pane') {
          initialEditType = 'markdown';
          previewStyle = 'vertical';
        }

      }

      return {
        height: height,
        content: content,
        toolbarItems: toolbarItems,
        previewStyle: previewStyle,
        initialEditType: initialEditType
      }
    }


    // The editor won't work directly on a textarea, for progressive enhancement using a
    // textarea is the ideal. So we use a textarea, hide it, and place the content from
    // our text editor into the textarea on form submit. The following method creates
    // the div the editor will live in .
    function addElement(textarea, config) {
      // create a new div element
      let div = document.createElement("div");
      // copy over CSS classes
      if (textarea.hasAttribute('class')) {
        let cssClasses = textarea.getAttribute('class').split(" ");
        cssClasses.forEach((cssClass) => {
          div.classList.add(cssClass);
        });
      }

      if (textarea.hasAttribute('rows')) {
        let rows = textarea.getAttribute('rows');
        let pixels = rows * pxPerRow; // 24 pixels per row
        div.style.minHeight = pixels + 'px';
      }
      textarea.insertAdjacentElement('afterend', div);
      textarea.style.display = "none";

      return div;
    }

    function enableEditor(textarea, Editor){
      let config = getConfig(textarea);
      let div = addElement(textarea);
      let form = textarea.closest('form');

      console.log('config.content:', config.content);
      console.log(config.content);

      let editor = new Editor({
        el: div,
        height: config.height,
        toolbarItems: config.toolbarItems,
        initialValue: textarea.value,
        initialEditType: config.initialEditType
      });

      form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        textarea.value = editor.getMarkdown();
        console.log('Submit Textarea:');
        console.log(textarea.value);
        form.submit();


        // Log a message to the console when the form is submitted
        console.log('Form submitted!');
      });

      editor.getMarkdown();
    }


    // Data Attribute DSL
    let editors = document.querySelectorAll("[data-markdown-editor]");

    if (editors.length > 0) {

      // Here we dynamically load the CSS and Javascript files for Toast UI Editor.
      //
      // These files are quite large (js 539kb & css 165kb) and we don't use the editor on very
      // many web pages, so we only load the files when an editor is used. We load the files
      // programmatically with Javascript to save the developers the headache of needing to include
      // these files every time we use an editor. We only load the files once per page, even if
      // multiple editors are present.

      // Load Toast UI Editor Stylesheet
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = `https://uicdn.toast.com/editor/${editorVersion}/toastui-editor.min.css`;
      document.body.appendChild(stylesheet);

      // Load Toast UI Editor Javascript
      const script = document.createElement('script');
      script.src = `https://uicdn.toast.com/editor/${editorVersion}/toastui-editor-all.min.js`;

      // Wait for script to load before enabling editors
      script.onload = function () {
        const Editor = toastui.Editor;
        console.log("Toast UI Editor JS file has loaded.");
        editors.forEach((textarea) => {
          console.log('Found a Markdown Editor');
          enableEditor(textarea, Editor);
        });
      };

      // Append the script to the body of the document
      document.body.appendChild(script);
    }



  })();

  // Search Component - Modern Vanilla JavaScript Version

  document.addEventListener('DOMContentLoaded', function() {

    function liveSearch() {

      document.querySelectorAll('[data-live-search]').forEach(form => {
        const searchInput = form.querySelector('.live-search-search-text');
        const clearButton = form.querySelector('.live-search-clear');
        const target = form.dataset.target;
        const hide = form.dataset.hide;
        const url = form.action;
        let delay = null;
        let isFirstCall = true;

        function handleSearch() {

          if (isFirstCall) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
              targetElement.style.display = 'block';
              targetElement.innerHTML = '<div class="mx-auto d-block" style="width: 5rem;" role="status"><div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status"></div><br>Searching…</div>';
            }
            performSearch(target, hide, url, form);
            isFirstCall = false;
          } else {
            if (delay) {
              clearTimeout(delay);
            }
            delay = setTimeout(() => performSearch(target, hide, url, form), 300);
          }
        }

        form.addEventListener('submit', function(event) {
          event.preventDefault();
          handleSearch(); // No parameters needed
        });

        searchInput?.addEventListener('keyup', async function(event) {
          const search = event.target.value;

          if (search.length <= 2) {
            exitSearch(target, form.dataset.hide);
            // Reset state when search is too short
            if (delay) {
              clearTimeout(delay);
            }
            delay = null;
            isFirstCall = true;
          } else {
            handleSearch();
          }
        });

        clearButton?.addEventListener('click', function(event) {
          event.preventDefault();
          const target = form.dataset.target;
          const reveal = form.dataset.hide;
          const searchInput = form.querySelector('.live-search-search-text');
          exitSearch(target, reveal, searchInput);
          // Reset state when clearing
          if (delay) {
            clearTimeout(delay);
          }
          delay = null;
          isFirstCall = true;
        });
      });
    }

    function exitSearch(target, reveal = null, clearInput = null) {
      clearInput?.value && (clearInput.value = '');

      const targetElement = document.querySelector(target);
      if (targetElement) {
        targetElement.innerHTML = '';
        targetElement.style.display = 'none';
      }
      if (reveal) {
        const revealElements = document.querySelectorAll(reveal);
        revealElements.forEach(revealElement => {
          revealElement?.style && (revealElement.style.display = 'block');
        });
      }

      reveal && (document.querySelector(reveal).style.display = 'block');
    }

    async function performSearch(target, hide, url, form) {
      const targetElement = document.querySelector(target);
      const hideElements = hide ? document.querySelectorAll(hide) : null;
      const data = new FormData(form);
      hideElements.forEach(hideElement => {
        hideElement?.style && (hideElement.style.display = 'none');
      });


      if (targetElement) {
        targetElement.style.display = 'block';

        try {
          const response = await fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {'X-Requested-With': 'fetch'}
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const html = await response.text();
          targetElement.innerHTML = html;

        } catch (error) {
          console.error('Search request failed:', error);
          targetElement.innerHTML = '<p>Search failed. Please try again.</p>';
        }
      }
    }

    liveSearch();
  });

  // IIFE (Immediately Invoked Function Expression)
  (function(webstop){

    // Public Sub-Class
    webstop.stores = {};

    // Public Method formPicker();
    // Called from the ajax-modal method as a callback that occurs after the store locator content loads.
    // It registers all the Choose Store buttons in the store locator and attaches the functionality which
    // populates the form and the UI.
    webstop.stores.formPicker = function(trigger) {
      // Setup data from Trigger
      let inputSelector   = trigger.getAttribute('data-store-picker-input');
      let addressSelector = trigger.getAttribute('data-store-picker-address');
      let inputTarget   = document.querySelector(inputSelector);
      let addressTarget = document.querySelector(addressSelector);
      // Register all Choose Store buttons
      let buttons = document.querySelectorAll('[data-store-selection]');
      if(buttons.length !== 0) {
        buttons.forEach((button) => {
          let id      = button.getAttribute('data-store-id');
          let name  = button.getAttribute('data-store-name');
          let address  = button.getAttribute('data-store-address');
          let city  = button.getAttribute('data-store-city');
          let state  = button.getAttribute('data-store-state');
          let zip  = button.getAttribute('data-store-zip');
          let hasAddress = false;
          if(name || address || city || state || zip){
            hasAddress = true;
          }
          let addressHTML = '';
          if(hasAddress) {
            if (name) {
              addressHTML += `<strong>${name}</strong><br>`;
            }
            addressHTML += `${address}<br>${city}, ${state} ${zip}`;
          }
          button.addEventListener("click", function (event) {
            // Display the address in the UI
            if(hasAddress){
              addressTarget.innerHTML = addressHTML;
            }
            // Set the value in the form
            inputTarget.value = id;
            // Update the Select a Store button text
            trigger.textContent = 'Change Store';
          });
        });
      }
    };


  })( window.webstop = window.webstop || {} );

  // Tag Search


  (function(){

    function tagSearch(){
      let delay = null;

      $(document.body).on('keyup', '[data-tag-search]', function(event) {
        clearTimeout(delay);
        const searchText   = event.target.value;
        const tagging = setTagging(this, searchText);

        if(searchText.length <= 2){
          exitTagSearch(tagging);
        } else {
          delay = setTimeout(function(){ performTagSearch(tagging); }, 100);
        }
      });

    }

    function setTagging(searchThis, searchText) {
      const $search    = $(searchThis);
      const searchId   = '#' + $search.attr('id');
      const targetId   = $search.data('tag-search-target');
      const displayId  = $search.data('tag-search-display');
      const resultsId  = $search.data('tag-search-results');

      const tagging = {
        searchText: searchText,
        searchId:   searchId,
        targetId:   targetId,
        displayId:  displayId,
        resultsId:  resultsId,
        $search:    $search,
        $target:    $(targetId),
        $display:   $(displayId),
        $results:   $(resultsId)
      };
      console.log('Tagging Set');
      console.log(`searchText: ${searchText}`);
      console.log(`searchId:   ${searchId}`);
      console.log(`targetId:   ${targetId}`);
      console.log(`displayId:  ${displayId}`);
      console.log(`resultsId:  ${resultsId}`);
      return tagging;
    }

    $('[data-tag-search]').each(function() {
      const tagging = setTagging(this, '');
      displayTags(tagging);
    });


    function makeTagResultsActive(){
      $(document.body).on('click', '[data-tag-add]', function(event){
        event.preventDefault();
        const searchId = $(this).data('tag-search-id');
        const tagging  = setTagging(searchId, '');
        let   tags     = trimArray(tagging.$target.val().split(','));
        const newTag   = $(this).data('tag-search-value').trim();

        //tags.indexOf(newTag) === -1 ? tags.push(newTag) : console.log("This tag already exists.");
        tags.push(newTag);
        tagging.$target.val(removeLeadingComma(uniqArraySort(tags).join()));

        displayTags(tagging);
        exitTagSearch(tagging);
      });
    }

    function displayTags(tagging){
      const tags  = trimArray(tagging.$target.val().split(','));
      let   items = [];
      let   html  = '';

      tags.forEach(function(tag){
        if(tag) {
          items.push(`<span class="tag bg-secondary"> ${tag} <span data-tag-search-remove-tag data-tag-text="${tag}"><i class="icon-cancel ml-1"></i></span></span>`);
        }
      });
      html = items.join('');
      tagging.$display.html(html);
      makeRemoveTagsActive(tagging);
    }

    function makeRemoveTagsActive(tagging){
      tagging.$display.find('[data-tag-search-remove-tag]').on('click', function(event){
        event.preventDefault();
        const tag   = $(this).data('tag-text');
        let   tags  = uniqArraySort(trimArray(tagging.$target.val().split(',')));
        const index = tags.indexOf(tag);

        tags.splice(index, 1);
        tagging.$target.val(removeLeadingComma(uniqArraySort(tags).join()));

        displayTags(tagging);
      });
    }

    function exitTagSearch(tagging){
      //$('[data-tag-add]').val('');
      tagging.$results.html('');
    }

    function performTagSearch(tagging){
      const url = window.webstop.apiHost + '/api/v1/tags/search';
      $.getJSON( `${url}?search=${tagging.searchText}`, function(data){renderTagSearchResults(data, tagging);});
    }

    function renderTagSearchResults(data, tagging){
      let html;
      let items = [];

      $.each( data, function( position, record ) {
        $.each( record, function( key, value ) {
          if(key == 'name'){
            //items.push(`<button class="list-group-item list-group-item-action" data-tag-add data-tag-search-target="${tagging.targetId}" data-tag-search-display="${tagging.displayId}" data-tag-search-results="${tagging.resultsId}" data-tag-search-value="${value}">${value}</button>`);
            items.push(`<button class="list-group-item list-group-item-action" data-tag-add data-tag-search-id="${tagging.searchId}" data-tag-search-value="${value}">${value}</button>`);
          }
        });
      });

      items.push(`<button class="list-group-item list-group-item-secondary list-group-item-action" data-tag-add data-tag-add data-tag-search-id="${tagging.searchId}" data-tag-search-value="${tagging.searchText}"><em class="text-muted">Create New "</em>${tagging.searchText}<em class="text-muted">" Tag.</em></button>`);

      html  = '<div class="list-group">';
      html += items.join('');
      html += '</div>';

      tagging.$results.html(html);
      makeTagResultsActive();
    }

    // Utilities
    function trimArray(a){
      let trim_a = [];
      a.forEach(function(i){
        trim_a.push(i.trim());
      });
      return trim_a;
    }

    function uniqArraySort(a) {
      return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
      })
    }

    function removeLeadingComma(text){
      if (text[0] == ',') {
        text = text.substring(1);
      }
      return text;
    }

    tagSearch();

  })();

  // The purpose of this script is to set iPads and mobile phones to use
  // the online format for circulars. We do this because Newsprints don't
  // properly on small screens.

  (function(){

    function setCircularFormat(){
      // This should set the cookie for iPad (768) and smaller
      if(document.body.clientWidth < 770 ){
        console.log('Setting circular cookie…');
        let name = window.webstop.retailerID + '_circular_format';
        cs3.setCookie(name, 'online', 7); // Note: many browsers cap JS set cookies to 7 days max.
      }
    }

    setCircularFormat();
  })();

  // Requires cookies.js to be loaded first

  (function(){
    const publicLayout = document.querySelector('.public');

    const sidenavToggles = document.querySelectorAll('[data-sidenav-toggle]');
    const sidebarToggles = document.querySelectorAll('[data-sidebar-toggle]');

    sidenavToggles.forEach((sidenavToggle) => {
      sidenavToggle.addEventListener("click", (event) => {
        event.preventDefault();
        publicLayout.classList.toggle('public-hide-sidenav');
        if(publicLayout.classList.contains('public-hide-sidenav')) {
          cs3.setCookie('public_sidenav', 'hide', 1);
        } else {
          cs3.setCookie('public_sidenav', 'show', 1);
        }
      });
    });
    sidebarToggles.forEach((sidebarToggle) => {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        publicLayout.classList.toggle('public-hide-sidebar');
        if(publicLayout.classList.contains('public-hide-sidebar')) {
          cs3.setCookie('public_sidebar', 'hide', 1);
        } else {
          cs3.setCookie('public_sidebar', 'show', 1);
        }
      });
    });
  })();

  (function() {


    // Toggle Shopping List View States (compact, expanded, in-store)

    function init() {
      // Get ALL shopping list elements
      const shoppingLists = document.querySelectorAll('.shopping-list-aside .shopping-list-items');

      // Get ALL toggle buttons from all button sets
      const viewToggleButtons = document.querySelectorAll('[data-shopping-list-view-toggle]');

      console.log(`Found ${shoppingLists.length} shopping list elements`);
      console.log(`Found ${viewToggleButtons.length} toggle buttons`);

      const retailerID = webstop.retailerID || 3362;

      const cookieName = 'shopping_list_view_for_retailer_' + retailerID;

      if (shoppingLists.length === 0) {
        console.warn('No shopping list elements found');
        return false;
      }

      if (viewToggleButtons.length === 0) {
        console.warn('No toggle buttons found');
        return false;
      }

      function setViewState(viewState) {
        console.log(`Setting view state to "${viewState}" for ${shoppingLists.length} shopping lists`);

        // Update ALL shopping list elements
        shoppingLists.forEach((shoppingList, index) => {
          shoppingList.setAttribute('data-shopping-list-view', viewState);
          console.log(`Updated shopping list ${index + 1}:`, shoppingList);
        });

        // Update ALL button states across all button sets
        viewToggleButtons.forEach(btn => {
          const buttonViewState = btn.getAttribute('data-shopping-list-view-toggle');
          if (buttonViewState === viewState) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        // Save the view state to cookie (expires in 365 days)
        cs3.setCookie(cookieName, viewState, 365);
        console.log(`View state "${viewState}" saved to cookie`);

        console.log(`All shopping lists updated to: ${viewState}`);
      }

      function getCurrentViewState() {
        // Return the state of the first shopping list (they should all be the same)
        return shoppingLists.length > 0 ?
          shoppingLists[0].getAttribute('data-shopping-list-view') : null;
      }

      // Add event listeners to ALL toggle buttons
      viewToggleButtons.forEach((button, index) => {
        console.log(`Adding listener to button ${index + 1}:`, button);

        button.addEventListener('click', (event) => {
          const viewState = event.currentTarget.getAttribute('data-shopping-list-view-toggle');
          console.log(`Button ${index + 1} clicked, setting view to: ${viewState}`);
          setViewState(viewState);
        });
      });

      // Check for saved view state in cookie, fallback to 'compact' if not found
      const savedViewState = cs3.getCookie(cookieName);
      const initialViewState = savedViewState || 'compact';

      console.log(`Saved view state from cookie: ${savedViewState}`);
      console.log(`Setting initial view state to: ${initialViewState}`);

      // Set initial state for all shopping lists
      setViewState(initialViewState);

      // Expose globally
      window.ShoppingListViews = {
        getCurrentView: getCurrentViewState,
        setView: setViewState,
        getShoppingLists: () => shoppingLists,
        getButtons: () => viewToggleButtons
      };

      return true;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

})();
//# sourceMappingURL=core-styles.js.map
