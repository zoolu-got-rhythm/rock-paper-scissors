"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
class Observable {
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
        let objRef = this;
        this.observers.forEach(observer => {
            observer.update(objRef, eventType);
        });
    }
}
exports.Observable = Observable;
