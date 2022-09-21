import { Emiter } from "./Emiter"
import {Topics} from '../constant'

export class DragValue extends Emiter{
  start(e){
    this.startX = e.clientX
    this.startY = e.clientY
    this.diffX = 0
    this.diffY = 0
  }

  update(e){
    this.diffX = e.clientX - this.startX
    this.diffY = e.clientY - this.startY
    this.emit(Topics.DragDataUpdated)
  }

  getDiffX(){
    return this.diffX
  }

  getDiffY(){
    return this.diffY
  }
}