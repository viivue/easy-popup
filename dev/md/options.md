## API

### Options

| Attribute              | Type         | Default           | Description                                                                       | 
|------------------------|--------------|-------------------|-----------------------------------------------------------------------------------|
| `id`                   | string       | Auto-generated ID | Set an ID for this popup                                                          |
| `theme`                | string       | `default`         | Other layouts: `right-side`                                                       |
| `hasMobileLayout`      | boolean      | `false`           | Enable mobile layout (`theme` options will not work when mobile layout is active) |
| `mobileBreakpoint`     | number       | `768`             | Activate mobile layout when the screen size is <=768px                            |
| `closeButtonInnerText` | string       | `svg/icon`        | Custom `innerText` of the close button                                            |
| `triggerSelector`      | CSS selector | `""`              | Click on this trigger will also toggle the popup                                  |
| `outerClass`           | string       | `""`              | Extra class to popup outer `.easy-popup`                                          |
| `keyboard`             | boolean      | `true`            | Close popup by pressing ESC key                                                   |

#### Deprecated options

| Attribute             | Type   | Default | Description                 | 
|-----------------------|--------|---------|-----------------------------|
| ~~`title`~~           | string | `""`    | Title for mobile layout     |
| ~~`closeButtonHTML`~~ | string | `""`    | Inner text for close button |