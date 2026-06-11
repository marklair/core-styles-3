---
layout: docs
title: Public Layout
description: Website layout for consumer facing pages.
toc: true
source: Webstop
menu: 
  layout:
    parent: Layouts
---

## Stylesheets & Javascripts

It's important to note that we use different CSS and JS files for admin layouts than we do for public facing layouts.
The code on this page is for public layouts only, see the [admin layouts page](/docs/3.0/layouts/admin/) for information
on admin layouts.

### The following belongs in the `<head>` tag of the admin layouts.

This first example is how we apply these to the a Ruby on Rails ERB file. The `CS3_VERSION` and `CS3_ICONS_KIT_KEY` constants
defined in the `config/initializers/cs3.rb` file. The `CDN_HOST` constant is defined as and environment variable (`.env` file).

#### Ruby on Rails `<head>` Example

If you are using the [Styler Gem](https://github.com/Webstop/styler) this will be found in the
`app/views/layouts/admin_cs3/_styles.html.erb` file.

The following also assumes we are using the [Core-Customizations Gem](https://github.com/Webstop/core-customizations) 
for retailer specific CSS.

```html
<head>
  <% if @retailer.nil? || @retailer.id.blank? %>
    <link href="<%= ENV['CDN_HOST'] %>/core-repos/core-styles-3/<%= CS3_VERSION %>/dist/css/core-styles-defaults.css" rel="stylesheet">
  <% else %>
    <% customizations_folder = 'customizations_v3' %>
    <% customizations_folder += "_#{ENV['CUSTOMIZATIONS_PUBLISH_LOCATION']}" if ENV['CUSTOMIZATIONS_PUBLISH_LOCATION'].present? && ENV['CUSTOMIZATIONS_PUBLISH_LOCATION'] != 'production' %>
    <%= stylesheet_link_tag "#{ENV['CDN_HOST']}/#{customizations_folder}/retailer_#{@retailer.id}/stylesheets/retailer_#{@retailer.id}.css", media: 'all' %>
  <% end %>
  <script src="https://kit.fontawesome.com/<%= CS3_ICONS_KIT_KEY %>.js" crossorigin="anonymous"></script>  
</head>
```

#### Raw HTML `<head>` Example

Note: _The values for the Retailer ID, CS3 version, the Font Awesome kit number, and the CDN Host will likely differ in your application._

```html
<head>
  <link rel="stylesheet" media="all" href="https://s3.grocerywebsite.com/customizations_v3/retailer_3278/stylesheets/retailer_3278.css">
  <script src="https://kit.fontawesome.com/8bda546f76.js" crossorigin="anonymous"></script>
</head>
```

### The following belongs near the end of the `<body>` tag of admin layouts.

This first example is how we apply these to the a Ruby on Rails ERB file. The `CS3_VERSION` constant is defined in the
`config/initializers/cs3.rb` file. The `CDN_HOST` constant is defined as and environment variable (`.env` file).

#### Ruby on Rails `<body>` Example

If you are using the [Styler Gem](https://github.com/Webstop/styler) this will be found in the
`app/views/layouts/admin_cs3/_scripts.html.erb` file.

```html
<body>
  
  ...

  <%# 3rd party JS libs %>
  <script src="https://code.jquery.com/jquery-<%= CS3_JQUERY_VERSION %>.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@<%= CS3_POPPER_VERSION %>/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@<%= CS3_BOOTSTRAP_VERSION %>/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-ujs@<%= CS3_JQUERY_UJS_VERSION %>/src/rails.min.js"></script>
  <script src="<%= ENV['CDN_HOST'] %>/core-repos/core-styles-3/<%= CS3_VERSION %>/dist/js/core-styles<%= '.min' if Rails.env.production? -%>.js"></script>
  <%- if Rails.env.production? -%>
    <%# Only load Aye analytics if the retailer has it turned on %>
    <% if @retailer.present? && @retailer.has_aye_analytics.present? && @retailer.has_aye_analytics? %>
      <script src="<%= ENV['CDN_HOST'] %>/core-repos/core-styles-3/<%= CS3_VERSION %>/dist/js/core-styles-aye.min.js"></script>
    <% end %>
  <%- end -%>
</body>
```

#### Raw HTML `<body>` Example

Note: _The values for the CS3 version and the CDN Host will likely differ in your application. Same with the version of
the 3rd party libs._

```html
<body>
  
  ...

  <script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-ujs@1.2.3/src/rails.min.js"></script>
  <script src="https://s3.grocerywebsite.com/core-repos/core-styles-3/{{< version >}}/dist/js/core-styles.min.js"></script>
</body>
```

## Default Example

This example shows the default set of options used by Webstop's products and is installed via the Styler gem.

### Sidenav and Sidebar Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="3" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidenav_and_sidebar" class="btn btn-primary wsg-btn-primary">
      View Sidenav & Sidebar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-borders public-with-sidenav public-with-sidebar">
  <header class="public-header" role="banner">
    Header...
    <nav class="public-sidenav-mobile offcanvas offcanvas-start" tabindex="-1"  id="public-sidenav-mobile" role="navigation">
      Mobile Left Side Navigation...
    </nav>
    <aside class="public-sidebar-mobile offcanvas offcanvas-end" style="overflow-x: hidden; overflow-y: auto;" tabindex="-1" id="public-sidebar-mobile" role="navigation" aria-label="Secondary">
      Mobile Right Side Shopping List...
    </aside>
  </header>
  <nav class="public-sidenav" role="navigation">
    Desktop Left Side Navigation...
  </nav>
  <div class="public-page">
    <main class="public-content" role="main">
      Main Content...
    </main>
    <footer class="public-footer" role="contentinfo">
      Footer...
    </footer>
  </div>
  <aside class="public-sidebar" role="complementary" aria-label="">
    Desktop Right Side Shopping List...
  </aside>
</div>
```

> <h4 class="mt-0">Site Modal</h4>
>
> To help keep the concepts easier to understand, we've left out the Site Modal code from the following HTML examples.
> See the [Site Modal](#site-modal) section at the end of the page for more information.

## Sass Variables

The following Sass variables are used to control the behavior of the Public Layout.

#### Header Height

| Variable Name             | Default Value            | Note    |
|---------------------------|--------------------------|---------|
| $public-header-height     | 60px;                    | Mobile  |
| $public-header-sm-height  | $public-header-height    |         |
| $public-header-md-height  | $public-header-sm-height |         |
| $public-header-lg-height  | $public-header-md-height | Desktop |
| $public-header-xl-height  | $public-header-lg-height |         |
| $public-header-xxl-height | $public-header-xl-height |         |

##### Common Example

In the following example uses the default `60px` header for mobile and `120px` for desktop sizes. Notice only the 
`$public-header-lg-height` variable is uncommented and modified. The larger sizes inherit from the smaller sizes so you 
can usually adjust just one variable to affect all larger sizes.

```scss
// $public-header-height:     60px;
// $public-header-sm-height:  $public-header-height;
// $public-header-md-height:  $public-header-sm-height;
$public-header-lg-height:     120px; // Desktop
// $public-header-xl-height:  $public-header-lg-height;
// $public-header-xxl-height: $public-header-xl-height;
```

### Public Layout Colors & Borders

| Variable Name        | Default Value   | Note |
|----------------------|-----------------|------|
| $public-border-color | $theme-primary  |      |
| $public-border-size  | 1px             |      |

#### Public Header

| Variable Name               | Default Value        | Note |
|-----------------------------|----------------------|------|
| $public-header-bg-color     | transparent          |      |
| $public-header-border-color | $public-border-color |      |
| $public-header-border-size  | $public-border-size  |      |

#### Public Sidecar

| Variable Name                | Default Value | Note |
|------------------------------|---------------|------|
| $public-sidecar-color        | $white        |      |
| $public-sidecar-bg-color     | $primary      |      |
| $public-sidecar-border-color | $primary      |      |
| $public-sidecar-border-size  | 0             |      |

#### Public Sidenav

| Variable Name                | Default Value        | Note |
|------------------------------|----------------------|------|
| $public-sidenav-bg-color     | transparent          |      |
| $public-sidenav-border-color | $public-border-color |      |
| $public-sidenav-border-size  | $public-border-size  |      |

#### Public Page (container for content and footer)

| Variable Name             | Default Value        | Note |
|---------------------------|----------------------|------|
| $public-page-bg-color     | $theme-bg            |      |
| $public-page-border-color | $public-border-color |      |
| $public-page-border-size  | $public-border-size  |      |

#### Public Content

| Variable Name                | Default Value        | Note |
|------------------------------|----------------------|------|
| $public-content-bg-color     | $theme-bg            |      |
| $public-content-border-color | $public-border-color |      |
| $public-content-border-size  | $public-border-size  |      |

#### Public Sidebar (a.k.a. Aside)

| Variable Name                | Default Value        | Note |
|------------------------------|----------------------|------|
| $public-sidebar-bg-color     | $theme-bg            |      |
| $public-sidebar-border-color | $public-border-color |      |
| $public-sidebar-border-size  | $public-border-size  |      |

#### Public Footer

| Variable Name               | Default Value        | Note |
|-----------------------------|----------------------|------|
| $public-footer-bg-color     | transparent          |      |
| $public-footer-border-color | $public-border-color |      |
| $public-footer-border-size  | $public-border-size  |      |

### Sizing & Spacers

<div class="alert alert-danger">
  Caution, changing the following variables can have adverse affects on the layout.
</div>

Use caution when modifying the following. Great care was given to make these properties play nicely on all responsive sizes.

#### Public Layout Sizes

| Variable Name              | Default Value                | Note                    |
|----------------------------|------------------------------|-------------------------|
| $public-header-height      | 132px                        |                         |
| $public-header-sm-height   | $public-header-height        |                         |
| $public-header-md-height   | $public-header-sm-height     |                         |
| $public-header-lg-height   | 133px                        |                         |
| $public-header-xl-height   | $public-header-lg-height     |                         |
| $public-header-xxl-height  | $public-header-xl-height     |                         |
| $public-sidecar-width      | 90px                         | Caution! Tread Lightly! |
| $public-sidenav-width      | 320px                        | Caution! Tread Lightly! |
| $public-sidebar-width      | 320px                        | Caution! Tread Lightly! |

#### Public Layout Spacers

| Variable Name            | Default Value     | Note                              |
|--------------------------|-------------------|-----------------------------------|
| $public-spacer-y         | $spacer           | $spacer is the Bootstrap default. |
| $public-spacer-x         | $spacer           | $spacer is the Bootstrap default. |
| $public-header-spacer-y  | 0                 |                                   |
| $public-header-spacer-x  | 0                 |                                   |
| $public-sidecar-spacer-y | $public-spacer-y  |                                   |
| $public-sidecar-spacer-x | 0                 |                                   |
| $public-sidenav-spacer-y | 0                 |                                   |
| $public-sidenav-spacer-x | 0                 |                                   |
| $public-content-spacer-y | $public-spacer-y  |                                   |
| $public-content-spacer-x | $public-spacer-x  |                                   |
| $public-sidebar-spacer-y | 0                 |                                   |
| $public-sidebar-spacer-x | 0                 |                                   |
| $public-footer-spacer-y  | $public-spacer-y  |                                   |
| $public-footer-spacer-x  | $public-spacer-x  |                                   |




## Ruby On Rails Support

Most of the time we don't talk about any back-end technology in our front-end framework. With the public layout
system we have built out a unique system to control page layout, so we are going to explain it here.

### Public Layout Template

At the heart of the layout system is the `public_v3` layout template. To use it place `layout 'public_v3'`
near the top of your controller. This is typically done right after any actions are called, like the `before_action`.
This one template handles all public page layouts.

### The `@public` Map

In the application controller we define a map called `@public`. The `@public` variable contains boolean settings which control the
page layout. These settings are explained in the chart below.

The `@public` hash is set at the top of a view file to control how that view will be presented in the public layout template.

<h4>Retailer Feature Configuration</h4>
<p>These define if the retailer uses the specified feature. Most of these are controlled through the Retailer Feature Settings form in the Rails app.</p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Key Name</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="text-nowrap">with_header</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Defines if the retailer has enabled the page header feature.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">with_sidecar</code></td>
      <td><code class="text-nowrap">false</code></td>
      <td>Defines if the retailer has enabled the sidecar left side navigation feature. <em>This feature isn't fully implemented yet.</em></td>
    </tr>
    <tr>
      <td><code class="text-nowrap">with_sidenav</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Defines if the retailer has enabled the side navigation menu feature for desktop breakpoints. At mobile breakpoints the side navigation is always enabled.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">with_sidebar</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Defines if the retailer has enabled the right sidebar feature for the Shopping List.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">with_footer</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Defines if the retailer has enabled the footer section.</td>
    </tr>
  </tbody>
</table>

<h4>Consumer Display Settings</h4>
<p>These define if the consumer has hidden the feature</p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Key Name</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="text-nowrap">show_header</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Controls whether the consumer has chosen to display the page header section. <em>We don't currently provide a way for consumers to adjust this setting.</em></td>
    </tr>
    <tr>
      <td><code class="text-nowrap">show_sidecar</code></td>
      <td><code class="text-nowrap">false</code></td>
      <td>Controls whether the consumer has chosen to display the sidecar left side navigation. <em>This feature isn't fully implemented yet.</em></td>
    </tr>
    <tr>
      <td><code class="text-nowrap">show_sidenav</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Controls whether the consumer has chosen to display the side navigation menu.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">show_sidebar</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Controls whether the consumer has chosen to display the right sidebar feature for the Shopping List.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">show_footer</code></td>
      <td><code class="text-nowrap">true</code></td>
      <td>Controls whether the consumer has chosen to display the footer section. <em>We don't currently provide a way for consumers to adjust this setting.</em></td>
    </tr>
  </tbody>
</table>

<h4>Meta Tag Settings</h4>
<p>These define meta tag settings for SEO purposes</p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Key Name</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="text-nowrap">meta_title</code></td>
      <td><code class="text-nowrap">''</code></td>
      <td>Sets the HTML meta title tag for SEO purposes. Used in the document head section and appears in browser tabs and search results.</td>
    </tr>
    <tr>
      <td><code class="text-nowrap">meta_keywords</code></td>
      <td><code class="text-nowrap">''</code></td>
      <td>Sets the HTML meta keywords tag. <em>Keywords are no longer used by Google, but some other search engines might still use them.</em></td>
    </tr>
    <tr>
      <td><code class="text-nowrap">meta_description</code></td>
      <td><code class="text-nowrap">''</code></td>
      <td>Sets the HTML meta description tag for SEO purposes. This text appears in search engine results and should provide a concise summary of the page content.</td>
    </tr>
  </tbody>
</table>

## Site Modal

The Site Modal is an empty hidden modal available for use by features such as [AJAX Modal](/docs/3.0/components/ajax/ajax-modal/),
and other features that rely on having a modal available. The modal is identified by the id attribute with a value of `site-modal`.
The Site Modal is also available in the [Admin Layout](/docs/3.0/layouts/admin/).

```html
<div class="public">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
  <div class="site-modal modal fade" id="site-modal" tabindex="-1" role="dialog" aria-labelledby="site-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="site-modal-content modal-content">
        <div class="modal-header">
          <div class="row mx-0 w-100">
            <div class="col ps-0">
              <h4 class="site-modal-title modal-title" id="site-modal-title"></h4>
            </div>
            <div class="col-auto pe-0">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal" aria-label="Close">
                <i class="fak fa-cancel"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="site-modal-body modal-body" id="site-modal-body"></div>
        <div class="site-modal-footer modal-footer" id="site-modal-footer">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
```


## Alternate Examples

The following examples are part of the public layout system, but not used by Webstop's standard products.


### Base Public Example

This example contains a header, footer, and main content sections.

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ccc; height: 120px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_base" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Base Public Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>


```html
<div class="public">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

### Sidecar Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="2" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #336; width: 15px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidecar" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidecar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidecar">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <nav class="public-sidecar" role="navigation">
      Public Sidecar Navigation...
  </nav>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

### Sidenav Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="2" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidenav" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidenav Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidenav">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <nav class="public-sidenav" role="navigation">
      Public Sidenav Navigation...
  </nav>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

### Sidecar and Sidenav Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="3" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #336; width: 15px;" rowspan="2"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidecar_and_sidenav" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidecar &amp; Sidenav Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidenav">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <nav class="public-sidecar" role="navigation">
      Public Sidecar Navigation...
  </nav>
  <nav class="public-sidenav" role="navigation">
      Public Sidenav Navigation...
  </nav>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

### Sidebar Example


<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="2" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #ccc; height: 120px;"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidebar" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidebar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidebar">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <aside class="public-sidebar">
    Public Sidebar...
  </aside>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```


### Sidecar and Sidebar Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="3" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #336; width: 15px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidecar_and_sidebar" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidecar & Sidebar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidecar public-with-sidebar">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <nav class="public-sidecar" role="navigation">
      Public Sidecar Navigation...
  </nav>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <aside class="public-sidebar">
    Public Sidebar...
  </aside>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

### Sidenav and Sidebar Example

_This is the default set of options used by Webstop's products._

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="3" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidenav_and_sidebar" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidenav & Sidebar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-borders public-with-sidenav public-with-sidebar">
  <header class="public-header" role="banner">
    Header...
    <nav class="public-sidenav-mobile offcanvas offcanvas-start" tabindex="-1"  id="public-sidenav-mobile" role="navigation">
      Mobile Left Side Navigation...
    </nav>
    <aside class="public-sidebar-mobile offcanvas offcanvas-end" style="overflow-x: hidden; overflow-y: auto;" tabindex="-1" id="public-sidebar-mobile" role="navigation" aria-label="Secondary">
      Mobile Right Side Shopping List...
    </aside>
  </header>
  <nav class="public-sidenav" role="navigation">
    Desktop Left Side Navigation...
  </nav>
  <div class="public-page">
    <main class="public-content" role="main">
      Main Content...
    </main>
    <footer class="public-footer" role="contentinfo">
      Footer...
    </footer>
  </div>
  <aside class="public-sidebar" role="complementary" aria-label="">
    Desktop Right Side Shopping List...
  </aside>
</div>
```

### Sidecar, Sidenav, and Sidebar Example

<div class="row">
  <div class="col-auto">
    <table style="width: 250px;"> 
      <tr>
        <td colspan="4" style="background-color: #369; height: 15px;"></td>
      </tr>
      <tr>
        <td style="background-color: #336; width: 15px;" rowspan="2"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
        <td style="background-color: #ccc; height: 120px;"></td>
        <td style="background-color: #eee; width: 60px;" rowspan="2"></td>
      </tr>
      <tr>
        <td style="background-color: #ddd; height: 5px;"></td>
      </tr>
    </table>
  </div>
  <div class="col">
    <a href="/docs/3.0/layouts/examples/public_with_sidecar_and_sidenav_and_sidebar" class="btn btn-outline-primary wsg-btn-outline-primary">
      View Sidecar, Sidenav & Sidebar Example Page <i class="fas fa-angle-right"></i>
    </a>
  </div>
</div>

```html
<div class="public public-with-sidecar public-with-sidebar">
  <header class="public-header" role="banner">
    Public Header...
  </header>
  <nav class="public-sidecar" role="navigation">
      Public Sidecar Navigation...
  </nav>
  <nav class="public-sidenav" role="navigation">
    Public Sidenav Navigation...
  </nav>
  <main class="public-page" role="main">
    Public Page Main Content...
  </main>
  <aside class="public-sidebar">
    Public Sidebar...
  </aside>
  <footer class="public-footer" role="contentinfo">
    Public Footer...
  </footer>
</div>
```

