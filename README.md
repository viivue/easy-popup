# Easy Popup
[![release](https://badgen.net/github/release/viivue/easy-popup/)](https://github.com/viivue/easy-popup/releases/latest)
[![Netlify Status](https://api.netlify.com/api/v1/badges/099e6ca7-c6f5-4f93-9f49-15986c7fc8d8/deploy-status)](https://app.netlify.com/sites/easy-popup/deploys)

> Super light-weight JavaScript library to create a simple popup with mobile layout.

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

Close opening popup with a button in popup body.

```html
<div data-easy-popup="demo">
    <p>Your content.</p>
    <p>
        <a data-easy-popup-toggle>Close this popup</a>
    </p>
</div>
```

## Options

Init with HTML

```html
<!-- Using data attribute with JSON Format (Recommended) -->
<div data-easy-popup='{"id": "demo-1"}'>
    <p>Your content.</p>
</div>

<!-- Using data attributes -->
<div data-easy-popup="demo"
     data-easy-popup-mobile="true"
     data-easy-popup-title="Popup title"
     data-easy-popup-theme="my-style"
     data-easy-popup-click-outside-to-close="false">
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
    autoShow: false, // boolean or number, e.g. 1000 for 1000ms after init

    // cookie
    cookie: undefined, // use PiaJs `expires`, see https://github.com/phucbm/pia#set-expires
    showingTimes: 1, // show n times before expiration day, only works with cookie

    // events
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

```shell
# Run dev server
npm run dev

# Build dev site
npm run build

# Generate production files, update version (package.json, _style.scss)
npm run prod
```

## License

[MIT License](https://github.com/viivue/easy-popup/blob/main/LICENSE)

Copyright (c) 2023 ViiVue
