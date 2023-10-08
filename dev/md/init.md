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

Open [Popup #1](#popup-1)


<div data-easy-popup="popup-1">
    <!-- Popup content -->
    <h2>Popup #1</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>

### With more options

```html

<div data-easy-popup='{"id": "popup-2"}'>
    <!-- Popup content -->
    <h2>Popup #2</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>
```

Open [Popup #2](#popup-2)

<div data-easy-popup='{"id": "popup-2"}'>
    <!-- Popup content -->
    <h2>Popup #2</h2>
    <p>Lorem ipsum dolor sit amet hendrerit nec neque ultricies.</p>
</div>