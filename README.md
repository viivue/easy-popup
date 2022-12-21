# Easy Popup v0.0.6

Super light-weight JavaScript library to create a simple popup with mobile layout.

## Init

Setup HTML

```html

<div data-easy-popup="demo">
    <p>Your content.</p>
</div>
```

Use `#demo` as the URL to open popup.

```html
<a href="#demo">Open popup</a>
```

or

```html

<button data-easy-popup-toggle="demo">Open popup</button>
```

## Options

Init with HTML attributes

```html
<!-- By using data attributes -->
<div data-easy-popup="demo"
     data-easy-popup-mobile="true"
     data-easy-popup-title="Popup title"
     data-easy-popup-theme="my-style"
     data-easy-popup-click-outside-to-close="false">
    <p>Your content.</p>
</div>

<!-- Or using data attribute with JSON Format -->
<div data-easy-popup='{"id": "demo-1"}'>
    <p>Your content.</p>
</div>
```

Init with JS

```js
EasyPopup.init('.popup', {
    id: 'popup-id', // required
    title: 'Demo 2', // title on mobile layout
    hasMobileLayout: false, // toggle mobile layout, false by default
    triggerSelector: '.open-demo-2', // set custom triggers
    closeButtonHTML: '<span>Click to close</span>', // set custom HTML for close button
    outerClass: 'my-popup', // custom class for popup
    theme: 'default', // to create multiple themes
    clickOutsideToClose: true, // true by default
    keyboard: true, // to close the popup by keyboard (ESC)
    onOpen: data => {
    },
    onClose: data => {
    },
});
```

## Methods

```js
// get popup
const myPopup = EasyPopup.get('popup-id');

// control popup
myPopup.open();
myPopup.close();
myPopup.toggle();
```

### Ignore click

Add class `easy-popup-ignore-click` to ignore click event. By default, all elements will have click event assigned by
Easy Popup. However, sometimes HTML that appends later via JS could lead to be treated as placed outside popup, which
leads to popup closing when that element clicked.

```html
<button class="easy-popup-ignore-click">My button</button>
```

## Themes

### theme:`right-side`

![](public/images/easy-popup-theme-right-side.gif)

```html

<div data-easy-popup="demo" data-easy-popup-theme="right-side">
    <p>Your content.</p>
</div>
```

## Deployment

### Dev server

Run production server

```shell
npm run web
```

Run dev server

```shell
npm run dev
```

You can add more dev site by duplicate dev or web folder and update the npm scripts.

### Generate production files

Generate UMD and module version

```shell
npm run prod
```

Generate UMD and module version then publish NPM package

```shell
npm run publish
```

### Build sites

Build production site

```shell
npm run build
```

Build dev site

```shell
npm run build-dev
```