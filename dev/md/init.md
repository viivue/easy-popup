## Use

### Default init

#### With attribute

Value of the attribute will be treated as the popup's ID.

```html

<div data-easy-popup='popup-1'>
  <!-- Popup content -->
  <h2>Popup #1</h2>
  <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>
```

...then you can use the popup's ID as the URL to [View popup](#popup-1).

```html
<a href='#popup-1'>Open Popup #1</a>
```

<div data-easy-popup="popup-1">
    <!-- Popup content -->
    <h2>Popup init by attribute with ID</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

#### With JSON

Initialize your popup with more options without touching the JavaScript file. [View popup](#popup-json).

```html

<div data-easy-popup='{"id": "my_popup"}'>
  <!-- Popup content -->
</div>
```

> Make sure the script always execute after the HTML has been loaded. Or run `EasyPopup.init()` anytime the HTML is
> ready.

<div data-easy-popup='{"id": "popup-json"}'>
    <!-- Popup content -->
    <h2>Popup init by JSON attribute</h2>
    <p>You can even open another popup from within the active one.</p>
    <a href="#popup-js">Open Popup init by JS</a>
</div>

### Custom init

Init anytime with JavaScript. [View popup](#popup-js).

```html

<div class='your-class'>
  <!-- Popup content -->
</div>
```

```js
EasyPopup.init('.your-class', {
  id: 'popup-js',
  // more options here
});
```

<div class="your-class">
    <!-- Popup content -->
    <h2>Popup init by JS</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

### Toggle popup with `[data-ep-toggle="id"]`

An alternative way to toggle a popup: <button data-ep-toggle="popup-3">Open Popup #3</button>

```html

<button data-ep-toggle='popup-3'>Open popup</button>
```

<div data-easy-popup="popup-3">
    <!-- Popup content -->
    <h2>Popup #3</h2>
    <p>Toggle button can also be placed inside a popup like this.</p>
    <button data-ep-toggle="popup-3">Close this popup</button>
</div>

A popup with adding multiple class with option `outerClass`. Click : <button data-ep-toggle="popup-4">Open Popup #4</button> and inspect to see in `.easy-popup`

```html

<button data-ep-toggle='popup-4'>Open popup</button>
```

<div data-easy-popup='{"id": "popup-4", "outerClass":"class-test class-test-1"}'>
    <!-- Popup content -->
    <h2>Popup #4</h2>
    <p>This example for extra classes in option "outerClass".</p>
    <button data-ep-toggle="popup-4">Close this popup</button>
</div>