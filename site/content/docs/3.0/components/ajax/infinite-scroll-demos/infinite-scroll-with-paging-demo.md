---
layout: docs
title: Infinite Scroll with Paging Demo
description: A Demonstration of the Infinite Scroll Component and a Paging Component.
toc: true
source: Webstop
menu: 
  components:
      tags: "Ajax"
      parent: Components
---

## Documentation

[Infinite Scroll with Paging Documentation](/docs/3.0/components/ajax/infinite-scroll/#infinite-scroll-with-paging-example)

## Paging

<div style="position: sticky; top: -16px; background: #fff; border-bottom: 1px solid #999; padding: 10px 10px;">
<div class="paging btn-group" role="group" aria-label="Basic outlined example">
  <a href="#" class="paging-prev btn btn-outline-primary"><i class="fa-solid fa-angle-left"></i><span class="visually-hidden">Previous Page</span></a>
  <div class="paging-dropdown btn-group" role="group">
    <button type="button" class="paging-current-page btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="d-none d-sm-inline">Page 0 of 3</span>
      <span class="d-inline d-sm-none">Pg. 0</span>
    </button>
    <ul class="paging-dropdown-menu dropdown-menu">
      <li><a class="paging-menu-title dropdown-item" href="#"><strong class="paging-menu-title-text">Section Title</strong></a></li>
      <li><a class="paging-page dropdown-item active" href="/ajax/ajax_page_1">Page 1 of 3</a></li>
      <li><a class="paging-page dropdown-item"        href="/ajax/ajax_page_2">Page 2 of 3</a></li>
      <li><a class="paging-page dropdown-item"        href="/ajax/ajax_page_3">Page 3 of 3</a></li>
    </ul>
  </div>
  <a href="#" class="paging-next btn btn-outline-primary"><i class="fa-solid fa-angle-right"></i><span class="visually-hidden">Next Page</span></a>
</div>
</div>

## Filler Text

> ---
>
> **The following text is here to push the example below the fold in the browser. This way it doesn't 
> trigger the moment you load the page. Scroll down to the [Infinite Scroll with Paging Example](#infinite-scroll-with-paging-example) to see it 
> in action.** _Please note, sometimes this content loads so fast you don't even see the loading spinner. You can 
> use the revisit the page using the Try Demo Again button to attempt to see it next time._
> 
> --- 

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

## Infinite Scroll with Paging Example

> ---
>
> This demo is often unimpressive because it usually loads so fast you don't even see the loading spinner. However, 
> all the content below this box is loaded via the Infinite Scroll features. Each of the Page headings indicates a 
> different document that was loaded, three in total.
>
> --- 

<div data-load-on-view="/ajax/ajax_page_1" data-infinite-scroll data-page-number="1" data-max-page-number="3" data-skip-history>
  <div class="d-flex justify-content-center m-4">
    <div class="d-block-inline">
      <div class="spinner-border" role="status"></div>
      <span class="h3 pb-2">Loading...</span>  
    </div>
  </div>
</div>
<div data-load-on-view="/ajax/ajax_page_2" data-infinite-scroll data-page-number="2" data-max-page-number="3" data-skip-history>
  <div class="d-flex justify-content-center m-4">
    <div class="d-block-inline">
      <div class="spinner-border" role="status"></div>
      <span class="h3 pb-2">Loading...</span>  
    </div>
  </div>
</div>
<div data-load-on-view="/ajax/ajax_page_3" data-infinite-scroll data-page-number="3" data-max-page-number="3" data-skip-history>
  <div class="d-flex justify-content-center m-4">
    <div class="d-block-inline">
      <div class="spinner-border" role="status"></div>
      <span class="h3 pb-2">Loading...</span>  
    </div>
  </div>
</div>
