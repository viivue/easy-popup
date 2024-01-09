## API

### Options

| Attribute              | Type                   | Default           | Description                                                                                                              | 
|------------------------|------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------|
| `id`                   | string                 | Auto-generated ID | Set an ID for this popup                                                                                                 |
| `theme`                | string                 | `default`         | Other layouts: `right-side`                                                                                              |
| `hasMobileLayout`      | boolean                | `false`           | Enable mobile layout (`theme` options will not work when mobile layout is active)                                        |
| `mobileBreakpoint`     | number                 | `768`             | Activate mobile layout when the screen size is <=768px                                                                   |
| `closeButtonInnerText` | string                 | `svg/icon`        | Custom `innerText` of the close button                                                                                   |
| `triggerSelector`      | CSS selector           | `""`              | Click on this trigger will also toggle the popup                                                                         |
| `outerClass`           | string                 | `""`              | Extra classes to popup outer `.easy-popup`                                                                               |
| `activeHtmlClass`      | string                 | `""`              | Extra class to `<html>` when a popup opens                                                                               |
| `keyboard`             | boolean                | `true`            | Close popup by pressing ESC key                                                                                          |
| `clickOutsideToClose`  | boolean                | `true`            | Click on empty outside an opening open will close the popup                                                              |
| `preventScroll`        | boolean                | `true`            | Prevent page scroll when popup is open                                                                                   |
| `autoShow`             | boolean or number (ms) | `false`           | `true` to show the popup right after page loaded, set number for delay, e.g. 1000 for 1000ms after init                  |
| `cookie`               | string or number       | `undefined`       | Requires `autoShow:true`. Set expiration for a popup. Use [PiaJs `expires`](https://github.com/phucbm/pia#set-expires).  |
| `showingTimes`         | number                 | `1`               | Requires `cookie`. Show n times before expiration day, only works with cookie                                            |
| `cookieName`           | string                 | `""`              | Requires `cookie`. Name of the cookie, change name will also lose access to the previous cookie => treat as a new cookie |

#### Deprecated options

| Attribute             | Type   | Default | Description                 | 
|-----------------------|--------|---------|-----------------------------|
| ~~`title`~~           | string | `""`    | Title for mobile layout     |
| ~~`closeButtonHTML`~~ | string | `""`    | Inner text for close button |