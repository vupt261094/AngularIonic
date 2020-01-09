import {IMessageBusService} from "../interfaces/message-bus-service.interface";
import {BehaviorSubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MessageBusService implements IMessageBusService {

    //#region Properties

    // Map of channels & event emitter.
    private _mChannel: Map<string, Map<string, Subject<any>>>;

    //#endregion

    //#region Constructor

    /*
    * Initialize service with injectors.
    * */
    public constructor() {
        this._mChannel = new Map<string, Map<string, Subject<any>>>();
    }

    //#endregion

    //#region Methods

    /*
    * Add message channel event emitter.
    * */
    public addMessageChannel<T>(channelName: string, eventName: string): Subject<T> {

        // Find channel mapping.
        const mChannel = this._mChannel;

        // Channel is not available.
        let mEventMessageEmitter: Map<string, Subject<any>>;

        if (mChannel.has(channelName)) {
            mEventMessageEmitter = mChannel.get(channelName);
        } else {
            mEventMessageEmitter = new Map<string, Subject<any>>();
            this._mChannel.set(channelName, mEventMessageEmitter);
        }

        if (mEventMessageEmitter.has(eventName)) {
            return mEventMessageEmitter.get(eventName);
        }

        const subject = new BehaviorSubject(null);
        mEventMessageEmitter.set(eventName, subject);
        return <Subject<T>>subject;
    }

    /*
    * Hook message event.
    * */
    public hookMessageChannel<T>(channelName: string, eventName: string): Subject<T> {

        const mChannel = this._mChannel;

        if (mChannel == null || !mChannel.has(channelName)) {
            mChannel.set(channelName, null);
        }

        let mEventMessageEmitter = mChannel.get(channelName);
        if (mEventMessageEmitter == null) {
            mEventMessageEmitter = new Map<string, Subject<any>>();
            mChannel.set(channelName, mEventMessageEmitter);
        }

        let emitter = mEventMessageEmitter.get(eventName);
        if (emitter == null) {
            emitter = new BehaviorSubject<any>(null);
            mEventMessageEmitter.set(eventName, emitter);
        }

        return emitter;
    }

    /*
    * Publish message to event stream.
    * */
    public addMessage<T>(channelName: string, eventName: string, data: T): void {

        // Find the existing channel.
        const mChannel = this._mChannel;
        if (!mChannel) {
            return;
        }
        let mEventMessageEmitter = mChannel.get(channelName);
        let subject: BehaviorSubject<any>;

        if (!mEventMessageEmitter) {
            subject = new BehaviorSubject(null);
            mEventMessageEmitter = new Map<string, Subject<any>>();
            mEventMessageEmitter.set(eventName, subject);
        } else {
            subject = <BehaviorSubject<any>> mEventMessageEmitter.get(eventName);
        }

        subject.next(data);
    }


    //#endregion

}
