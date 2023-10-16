## `cookie`

Requires [PiaJs](https://github.com/phucbm/pia) v0.0.4 or later.

Show popup **once** and not showing again after a period of time.

- Popup re-appears after 7 days: `{autoShow:true, cookie: 7}`
- Popup re-appears after 30 days: `{autoShow:true, cookie: "30 days"}`
- Popup re-appears after 8 hours: `{autoShow:true, cookie: "8 hours"}`

Show popup for **a number of times** and reset after a period of time.

- Shows 3 times, then re-appears after 7 days: `{autoShow:true, cookie: 7, showingTimes: 3}`

### Clear cookie

To clear cookie for all client devices.

- `{autoShow:false}`: prevent the popup reappears, however, the cookie still exists in the client
  devices.
- `{cookie:undefined}`: clear cookie if any.

### Update cookie

Set a new cookie name to disconnect with the current cookie. Otherwise, the popup will always look for the cookie with
the
default name.

- `{cookie:"new_expiration_value", cookieName:"new_name"}`

### Test cookie

Using [`Pia.test()`](https://github.com/phucbm/pia#test-record).

```js
const popup = EasyPopup.get('popup-cookie');

console.log(Pia.test(popup.cookie.key));
```

> [Click here to reload and view demo cookie popups](?view-cookie-popup)