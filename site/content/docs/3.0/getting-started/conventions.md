---
layout: docs
title: Conventions
source: Webstop
menu: 
  getstart:
    parent: Getting Started
    weight: 2
---

## Use Class Selectors for Styling

Styling should only be applied to HTML class attributes with very few exceptions. The one exception is when you are changing 
the styling of _every element on the site_, like when changing the font of all text on the site. Otherwise use class names.

### Why only classes?

**When compared to styling HTML tags**, class names let you focus on just the elements you want to style, your styling won't 
have unintended consequences of affecting the styling of elements you didn't intend to if only namespaced classes are 
involved. This is the biggest issue I run into with bad naming. Someone makes a CSS ruleset that uses an HTML tag as part 
of the selector and it ends up applying that styling to things they didn't intend it to.

Sometimes I see something like this done `.some-class li` and the developer thinks they are safe because they used a class, 
but then later we discover that there are some li tags nested inside the `.some-class` that get affected. Instead it 
should be written like `.namespace .namespace-attribute`

**When compared to styling HTML id attributes**, class names let you build reusable styles. Remember the very definition 
of an id attribute states that it should be a value that's unique on the page, so it can literally only exist once on 
the page. If their is more than one id of the same name on the page we have a bug and are violating the W3C specifications. 
Plus there's no real advantage to an id over a class. 

The id is for JavaScript. Think of the id attribute as being meant for JavaScript features to 
be able to identify one element from another, like when you add a circular item to a shopping list, how does the script 
logic know one circular item from the dozen or so other circular items on the page? The id attribute acts as the unique 
identifier which enables this.

**When compared to styling the HTML style attribute**, class names allow you to place the styles in a consistent place, 
engage in a separation of concerns (html in one file, css in another, & javascript in another), and build reusable styling. 
Most of the time when someone styles the 

_There's really no down side to always styling class attributes, and quite a few issues are avoided when you do._

## Component Naming Conventions

Nearly everything should be a component. Only when desiring to update the base styling of _every element on the site_ 
should you style anything in a pattern other than the component pattern.
_See the [components guide](/guides/3.0/components) for more details on creating
components._

The base component will be enclosed in a class of it's name. 
E.G. a coupon will be enclosed in an element (perhaps a `div` tag) with the `.coupon` class. 

The class names of the component will be prefixed by the component's name. 
E.G. the class for a coupon's title will be `.coupon-title`.

The class names for a single item will be singular and when we have a collection of items the wrapper class will be the plural version of the components name.

### Example

```html
<div class="coupons">
  <div class="coupon">
    <h4 class="coupon-title">some title</h4>
    <p class="coupon-description">some description</p>
    ...
  </div>
  <div class="coupon">
    <h4 class="coupon-title">some title</h4>
    <p class="coupon-description">some description</p>
    ...
  </div>
  <div class="coupon">
    <h4 class="coupon-title">some title</h4>
    <p class="coupon-description">some description</p>
    ...
  </div>
  ...
</div>
```

If you haven't read the [components guide](/guides/3.0/components) guide lately it is a good idea to review it now. 
It has valuable information about things like the various types of class names and the conventions for naming them, the 
order classes should be applied to the HTML class attribute, and etc. See the [components guide](/guides/3.0/components) 
for more details on creating components.

## Use Semantic Design

HTML tags are designed to communicate meaning. A common mistake developers make is placing content into `div` tags when 
a more appropriate tag exists. For example, headings have `h1` through `h6` tags, paragraphs have `p` tags, lists have 
`ul` and `ol` tags, and etc. Th

Don't just place everything into `div` tags. The `div` tag is only meant to be a container for being able to apply layout 
to non-semantic elements. 
