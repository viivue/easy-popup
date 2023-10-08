## Use

### With `[data-easy-popup="id"]`

Value of the attribute will be treated as the popup's ID.

```html

<div data-easy-popup="popup-1">
    <!-- Popup content -->
    <h2>Popup #1</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>
```

...then you can use the popup's ID as the URL to [Open Popup #1](#popup-1)

```html
<a href="#popup-1">Open Popup #1</a>
```

<div data-easy-popup="popup-1">
    <!-- Popup content -->
    <h2>Popup #1</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

### With more options

Initialize your popup with more options without touching the JavaScript file.

```html

<div data-easy-popup='{"id": "popup-2"}'>
    <!-- Popup content -->
    <h2>Popup #2</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>
```

[Open Popup #2](#popup-2)

<div data-easy-popup='{"id": "popup-2"}'>
    <!-- Popup content -->
    <h2>Popup #2</h2>
    <p>You can even open another popup from within the active one.</p>
    <a href="#popup-3">Open Popup #3</a>
</div>

### Toggle popup with `[data-ep-toggle="id"]`

An alternative way to toggle a popup

```html

<button data-ep-toggle="popup-3">Open popup</button>
```

<button data-ep-toggle="popup-3">Open Popup #3</button>

<div data-easy-popup="popup-3">
    <!-- Popup content -->
    <h2>Popup #3</h2>
    <p>Toggle button can also be placed inside a popup like this.</p>
    <button data-ep-toggle="popup-3">Close this popup</button>
</div>