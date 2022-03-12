# Easy Popup v0.0.1

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
<a href="#demo">Open popup 1</a>
```

## Methods

```js
// init with JS
EasyPopup.init('.popup', {
    id: 'popup-id', // required
    title: 'Demo 2', // title on mobile layout
    hasMobileLayout: true, // toggle mobile layout, true by default
    triggerSelector: '.open-demo-2', // set custom triggers
    closeButtonHTML: '<span>Click to close</span>', // set custom HTML for close button
    outerClass: 'hello', // custom class for popup
});

// get popup
const myPopup = EasyPopup.get('popup-id');

// control popup
myPopup.open();
myPopup.close();
myPopup.toggle();
```

## Deployment

Install gulp

```shell
npm install
```

And start a dev server

```shell
gulp serve
```