### Methods

[//]: # (note: methods in test-methods.js)

#### Global methods

| Name                                | Description                                  | 
|-------------------------------------|----------------------------------------------|
| `EasyPopup.init(selector, options)` | Init a popup                                 |
| `EasyPopup.get(popupId)`            | Get a popup instance                         |
| `EasyPopup.setDev(isDev)`           | Enable/disable dev mode to see console logs. |

#### Instance methods

| Name                               | Description                 | 
|------------------------------------|-----------------------------|
| `instance.open()`                  | Open the popup              |
| `instance.close()`                 | Close the popup             |
| `instance.toggle()`                | Toggle the popup            |
| `instance.on(eventName, callback)` | Assign events with callback |

```js
// get instance
const popup = EasyPopup.get('my-popup');

// open popup
popup.open();
```