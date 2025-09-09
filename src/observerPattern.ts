interface Observer<ObservableClass, ObservableEventEnum> {
    update: (ObjectRef: ObservableClass, observableEventEnum: ObservableEventEnum) => void;
}

class Observable<ObservableClass, ObservableEventEnum> {
    observers: Observer<ObservableClass, ObservableEventEnum>[];

    constructor() {
        this.observers = [];
    }

    attach(observer: Observer<ObservableClass, ObservableEventEnum>) {
        this.observers.push(observer);
    }

    detach(observer: Observer<ObservableClass, ObservableEventEnum>) {
        const indexOfObserver = this.observers.indexOf(observer);
        if (indexOfObserver > -1) this.observers.splice(indexOfObserver, 1);
    }

    notify(eventType: ObservableEventEnum) {
        let objRef = this as unknown as ObservableClass;
        this.observers.forEach((observer) => {
            observer.update(objRef, eventType);
        });
    }
}

export { Observable, Observer };
