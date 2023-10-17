import md from "../md/events.md";

export function testEvents(root){
    root.insertAdjacentHTML('beforeend', md);

    // init
    EasyPopup.init('.event-popup', {
        id: 'event-popup',

        // assign listener when init
        onOpen: data => {
            console.log('Test event: open', data);
        }
    });

    // get instance
    const popup = EasyPopup.get('event-popup');

    // listen to an event after init
    popup.on('close', data => {
        console.log('Test event: close', data);
    });
}