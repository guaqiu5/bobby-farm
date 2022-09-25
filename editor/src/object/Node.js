import { Emiter } from "./Emiter";
import {Map as ImmutableMap, List} from 'immutable'
// Immutable 可以做到让状态可预测，没有副作用
// Immutable 采用了结构共享机制，所以会尽量复用内存
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