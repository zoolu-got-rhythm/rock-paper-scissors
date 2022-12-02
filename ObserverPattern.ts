interface Observerable<ObservableType, ObserverableEventEnum>{
    observers: Observer<ObservableType, ObserverableEventEnum>[];
    
    attach: (observer: Observer<ObservableType, ObserverableEventEnum>) => void;

    detach: (observer: Observer<ObservableType, ObserverableEventEnum>) => void;

    notify: (oeventType: ObserverableEventEnum) => void;
}

interface Observer<ObservableType, ObserverableEventEnum>{
    update: (ObjectRef: ObservableType, observerableEventEnum: ObserverableEventEnum) => void;
}   

enum SomeClassEvent{
    EVENT1,
    EVENT2
}

class SomeClass implements Observerable<SomeClass, SomeClassEvent>{
    observers: Observer<SomeClass, SomeClassEvent>[];

    constructor(){
        this.observers = [];
    }

    attach(observer: Observer<SomeClass, SomeClassEvent>){

    }

    
    detach(observer: Observer<SomeClass, SomeClassEvent>){

    }

    notify(eventType: SomeClassEvent){
        this.observers.forEach(observer => {
            observer.update(this, eventType);
        });
    }
}

export {Observerable, Observer};