import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'main-message',
    templateUrl: './message.component.html',
    styleUrls: ['message.component.scss']
})
export class MessagePage implements OnInit {

    text: string;

    //#region Constructor

    constructor() {
        console.log('Hello LoginComponent Component');
        this.text = 'Hello World';
    }

    ngOnInit() {
        // this.pusherService.channel.bind(PusherConstant.getMessage, data => {
        //   this.messages.unshift(data);
        // });

    }

    public messages = [
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            content: "mentioned you in a comment",
            time: "5"
        },
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            content: "mentioned you in a comment",
            time: "5"
        },
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            content: "mentioned you in a comment",
            time: "5"
        }]
    //#endregion

    //#region Method


    //#endregion
}
