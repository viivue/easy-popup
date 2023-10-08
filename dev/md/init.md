[![release](https://badgen.net/github/release/viivue/easy-popup/)](https://github.com/viivue/easy-popup/releases/latest)
[![minified](https://badgen.net/badge/CSS+JS/11KB/cyan)](https://www.jsdelivr.com/package/gh/viivue/easy-popup)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/viivue/easy-popup/badge?style=rounded)](https://www.jsdelivr.com/package/gh/viivue/easy-popup)
[![Netlify Status](https://api.netlify.com/api/v1/badges/099e6ca7-c6f5-4f93-9f49-15986c7fc8d8/deploy-status)](https://app.netlify.com/sites/easy-popup/deploys)

## Use

### With attribute `data-easy-popup`

```html

<div data-easy-popup>
    <!-- Popup content -->
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>
```

_Well, you can't open this popup as we don't have any ID for it._

<div data-easy-popup>
    <!-- Popup content -->
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

### With an ID

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
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

An alternative way to toggle a popup

```html

<button data-easy-popup-toggle="demo">Open popup</button>
```