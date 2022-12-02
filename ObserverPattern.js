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
        this.observers.push(observer);
    }
    detach(observer) {
        const indexOfObserver = this.observers.indexOf(observer);
        if (indexOfObserver > -1)
            this.observers.splice(indexOfObserver, 1);
    }
    notify(eventType) {
        this.observers.forEach(observer => {
            observer.update(this, eventType);
        });
    }
}
class ChildClass extends SomeClass {
    constructor() {
        super();
        this.data = 5;
    }
    doSomething() {
        this.notify(SomeClassEvent.EVENT2);
    }
    getData() {
        return this.data;
    }
}
let childObject = new ChildClass();
childObject.attach({
    update: (obj, observerableEventEnum) => {
        let ob = obj;
        console.log("event triggered", observerableEventEnum);
        console.log("getting data", ob.getData());
    }
});
childObject.doSomething();
childObject.doSomething();
