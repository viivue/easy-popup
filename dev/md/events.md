### Events

[//]: # (note: test event in test-events.js)

| Name    | Description    | 
|---------|----------------|
| `open`  | On popup open  |
| `close` | On popup close |

```js
// init
EasyPopup.init('.popup', {
    id: 'my-popup',

    // assign listener when init
    onOpen: data => {
        console.log('Popup open', data);
    }
});

// get instance
const popup = EasyPopup.get('my-popup');

// listen to an event after init
popup.on('close', data => {
    console.log('Popup close', data);
});
```

Open console log to see data changes on event fires. [View popup](#event-popup).

<div class="event-popup">
    <!-- Popup content -->
    <h2>Popup for events testing</h2>
    <p>Open console log to see data changes.</p>
</div>