## API

### Options

| Attribute              | Type   | Default           | Description                                                                       | 
|------------------------|--------|-------------------|-----------------------------------------------------------------------------------|
| `id`                   | string | Auto-generated ID | Set an ID for this popup                                                          |
| `theme`                | string | `default`         | Other layouts: `right-side`                                                       |
| `hasMobileLayout`      | string | `false`           | Enable mobile layout (`theme` options will not work when mobile layout is active) |
| `mobileBreakpoint`     | number | `768`             | Activate mobile layout when the screen size is <=768px                            |
| `closeButtonInnerText` | string | `svg/icon`        | Custom `innerText` of the close button                                            |

#### Deprecated options

| Attribute             | Type   | Default | Description                 | 
|-----------------------|--------|---------|-----------------------------|
| ~~`closeButtonHTML`~~ | number | ``      | Inner text for close button |