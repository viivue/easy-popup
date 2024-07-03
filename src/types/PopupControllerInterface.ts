import {PopupInstance} from "./PopupInstance";


export interface PopupControllerInterface {
    active: string;
    popups: PopupInstance[];

    add(popup: PopupInstance): void;

    get(id: string): PopupInstance | undefined;
}
