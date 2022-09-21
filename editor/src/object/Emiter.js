import {Observable} from 'rxjs'

export class Emiter {

    constructor(){
        this.observers = new Map()
    }

    addObserverFunction(topic , fn ) {
        if(!this.observers.has(topic)) {
          this.observers.set(topic, [])
        }
        this.observers.get(topic)?.push(fn)
      }

    on(topic) {
        return new Observable(observer => {
          if(Array.isArray(topic)) {
            topic.forEach(t => {
              this.addObserverFunction(t, (data) => {
                observer.next(data)
              })
            })
          } else {
            this.addObserverFunction(topic, (data) => {
              observer.next(data)
            }) 
          }   
        })
      }
    
    emit(topic, data) {
        this.observers.get(topic)?.forEach(fn => {
          fn(data)
        })
      }
}
