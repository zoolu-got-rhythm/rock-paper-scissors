// interface Observerable<ObservableType, ObserverableEventEnum>{
//     observers: Observer<ObservableType, ObserverableEventEnum>[];
    
//     attach: (observer: Observer<ObservableType, ObserverableEventEnum>) => void;

//     detach: (observer: Observer<ObservableType, ObserverableEventEnum>) => void;

//     notify: (oeventType: ObserverableEventEnum) => void;
// }

interface Observer<ObservableType, ObserverableEventEnum>{
    update: (ObjectRef: ObservableType, observerableEventEnum: ObserverableEventEnum) => void;
}   

enum SomeClassEvent{
    EVENT1,
    EVENT2
}

class Observable<ChildClass, EnumEventType>{
    observers: Observer<ChildClass, EnumEventType>[];

    constructor(){
        this.observers = [];
    }

    attach(observer: Observer<ChildClass, EnumEventType>){
        this.observers.push(observer);
    }

    detach(observer: Observer<ChildClass, EnumEventType>){
        const indexOfObserver = this.observers.indexOf(observer);
        if(indexOfObserver > -1)
            this.observers.splice(indexOfObserver, 1);
    }

    notify(eventType: EnumEventType){
        let objRef = ((this as unknown) as ChildClass);
        this.observers.forEach(observer => {
            observer.update(objRef, eventType);
        });
    }
}

class ChildClass extends Observable<ChildClass, SomeClassEvent>{

    data: number; 

    constructor(){
        super();
        this.data = 5;
    }

    doSomething(){
        this.notify(SomeClassEvent.EVENT2);
    }

    getData(): number{
        return this.data;
    }
}

let childObject = new ChildClass();
childObject.attach({
    update: (obj, observerableEventEnum) => {
        console.log("event triggered", observerableEventEnum);
        console.log("getting data", obj.getData());
    }
});

childObject.doSomething();
childObject.doSomething();

export {Observable, Observer};