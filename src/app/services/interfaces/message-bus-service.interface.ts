import {Subject} from "rxjs";

export interface IMessageBusService {

    //#region Methods

    // Add message channel.
    addMessageChannel<T>(channelName: string, eventName: string): Subject<T>;

    // Hook message event.
    hookMessageChannel<T>(channelName: string, eventName: string): Subject<T>;

    // Publish message to event stream.
    addMessage<T>(channelName: string, eventName: string, data?: T): void;

    //#endregion

}
