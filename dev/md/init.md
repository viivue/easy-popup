## Init

Init with attribute `data-easy-popup` www.google.com

```html

<div data-easy-popup>
    <!-- Popup content -->
</div>
```

Or with JSON format for more options

```html
<!-- -->
<div data-easy-popup='{"id": "demo-1"}'>
```

```js
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");
const {showdownCopyCode} = require("showdown-copy-code");
```

```css
.easy-popup-master {
    --ep-heading-height:45px;
    --ep-top-empty-space:100px; /* on mobile */
    --ep-bg:rgba(0, 0, 0, .3);
    --ep-padding:clamp(20px, 2vw, 40px);
    --ep-max-width:915px;
    --ep-radius:10px;
    --ep-close-width:40px;
    --ep-close-color:#fff;
    --ep-close-color-hover:#ef1616;

    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:9999;
    background:var(--ep-bg);
    backdrop-filter:blur(2px);
    transition:opacity .4s ease, visibility .4s ease;
}
```

Click here to <a href="#demo-1">open popup 1</a>. [open](#demo-1)

<div data-easy-popup='{"id": "demo-1"}'>
    <h2>Demo 1</h2>
    <p>
        Ex vestibulum volutpat accumsan dictumst fusce. Tincidunt congue bibendum fermentum fusce pede tristique
        aliquam lorem maximus lectus pellentesque. Mauris lorem conubia tempus urna ullamcorper tempor eleifend
        tortor
        quisque fames aliquam. Eros nam eu pretium potenti donec litora dictum. Donec justo posuere venenatis duis
        rhoncus habitasse quisque ridiculus vitae convallis. Fermentum dolor justo consectetur semper lacinia
        dapibus
        nisl integer eu ridiculus. At dignissim augue hendrerit mauris mattis eleifend diam dui scelerisque egestas
        rhoncus.
        Ipsum quam efficitur vivamus consectetuer dictumst tincidunt. Lacinia dignissim conubia dui facilisi dictum
        semper nunc magnis nisi tortor non. Inceptos volutpat enim ultricies proin rhoncus vulputate dignissim
        pulvinar
        iaculis. Inceptos pulvinar scelerisque duis facilisi elementum suscipit viverra ante velit litora. Viverra
        ornare urna mi fames bibendum enim nunc neque et nostra placerat.
    </p>
</div>