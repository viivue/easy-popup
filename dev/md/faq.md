## FAQ

<details>
<summary>1. The page got jumping when the popup is shown. How to fix it?</summary>

You need to understand how `preventScroll` works in Easy Popup.
When you enable the `preventScroll` option:

1. Easy Popup adds an `ep-prevent-scroll` class to the `<body>`.
    - This sets `overflow: hidden` to prevent page scrolling.
2. Hiding the scrollbar can cause the page to shift right.
3. To prevent shifting, Easy Popup adds `padding-right` to the `<body>`.
    - The padding is equal to the scrollbar width.
4. The scrollbar width is auto-calculated by JavaScript.
    - Note: This may not be 100% accurate across all browsers/devices.

Easy Popup has a built-in function to calculate the scrollbar width automatically depending on the browser/device.
However, this may not work as expected in some cases.

For optimal results:

- Set the scrollbar width via CSS.
- Use the same value for the `scrollbarWidth` option in Easy Popup.

```css
/* custom scrollbar */
/* Works on Chrome, Edge, and Safari */
body::-webkit-scrollbar {
    width:8px;
}

body::-webkit-scrollbar-track {
    background:#ccc;
}

body::-webkit-scrollbar-thumb {
    background-color:#000;
}
```

Easy Popup options

```json
{
  "preventScroll": true,
  "scrollbarWidth": 8
}
```

Note: On touch screen, the scrollbar width is set to `0` automatically.

</details>