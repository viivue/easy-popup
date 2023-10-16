## `cookie`

Requires [PiaJs](https://github.com/phucbm/pia) v0.0.4 or later.

Show popup **once** and not showing again after a period of time.

- Popup re-appears after 7 days: `{autoShow:true, cookie: 7}`
- Popup re-appears after 30 days: `{autoShow:true, cookie: "30 days"}`
- Popup re-appears after 8 hours: `{autoShow:true, cookie: "8 hours"}`

Show popup for **a number of times** and reset after a period of time.

- Shows 3 times, then re-appears after 7 days: `{autoShow:true, cookie: 7, showingTimes: 3}`

### Remove/clear cookie

To stop using cookie to control a popup, simply change the init options:

- `{autoShow:false}`: prevent the popup reappears, however, the cookie still exists in the client
  devices.
- `{cookie:undefined}`: clear cookie if any.

Or use method:

```js
const popup = EasyPopup.get('my-popup');
popup.cookie.remove(); // remove the cookie data completely
```

### Update/reset cookie

Once the popup with cookie has been init, the only way to update the cookie is to set a new name for the cookie.

Useful when you want to reset the cookie expiration, or set new expiration.

- `{cookie:"new_expiration_value", cookieName:"new_name"}`

### Test cookie

You can use [`Pia.test()`](https://github.com/phucbm/pia#test-record) to see cookie info.

```js
const popup = EasyPopup.get('my-popup');
console.log(Pia.test(popup.cookie.key));
```

### Cookie demo

> [Click here to view demo cookie popup](?view-cookie-popup)

<details>
<summary>View demo code</summary>

```html

<div data-easy-popup='{"id": "popup-cookie", "autoShow": "true", "cookie": "1 day", "showingTimes": "5"}'>
    <!-- Popup content -->
</div>
```

</details>