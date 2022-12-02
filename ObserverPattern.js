"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SomeClassEvent;
(function (SomeClassEvent) {
    SomeClassEvent[SomeClassEvent["EVENT1"] = 0] = "EVENT1";
    SomeClassEvent[SomeClassEvent["EVENT2"] = 1] = "EVENT2";
})(SomeClassEvent || (SomeClassEvent = {}));
class SomeClass {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
    }
    detach(observer) {
    }
    notify(eventType) {
        this.observers.forEach(observer => {
            observer.update(this, eventType);
        });
    }
}
