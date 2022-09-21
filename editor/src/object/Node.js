import { Emiter } from "./Emiter";
import {Map as ImmutableMap, List} from 'immutable'

export class Node extends Emiter {

  constructor(
    type,
    x,
    y,
    w,
    h
  ) {
    super()
    this.nodeData = ImmutableMap({
      type,
      x,
      y,
      w,
      h,
      children: List() 
    })
  }

  add(child) {
    console.log('add child')
    this.nodeData = this.nodeData.update('children', (children) => {
      return children.push(child)
    })

  }

  getType() {
		return this.nodeData.get('type')
	}

	getX(){
		return this.nodeData.get('x')
	}

	getY(){
		return this.nodeData.get('y')
	}

	getW(){
		return this.nodeData.get('w')
	}

	getH() {
		return this.nodeData.get('h')
	}

   getChildren() {
		return this.nodeData.get('children').toJS()
	}

   setXY(vec) {
    this.nodeData = this.nodeData
      .set("x", vec[0] + this.nodeData.get("x"))
      .set("y", vec[1] + this.nodeData.get("y"))
  }

  printData(){
    console.log(this.nodeData.toJS())
  }
}