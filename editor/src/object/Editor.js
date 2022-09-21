
import { Actions, States ,Topics} from '../constant/index'
import {Node} from './Node'
import { StateMachine } from './StateMachine'

export class Editor extends StateMachine {

  constructor(){
    super(States.Start)
    this.root = new Node('root', 0, 0, 800, 800)
    this.describeAddComponent()
    this.describeDrag()
  }

  describeDrag(){
    let dragNode 
    this.register(
      States.Start,
      States.DragStart,
      Actions.EvtDragStart,
      (node ) => {
        console.log('node start drag')
        dragNode = node
      }
    )

    this.register(
      States.DragStart,
      States.Stoped,
      Actions.EvtDragEnd,
      (vec) => {
        dragNode.setXY(vec)
        dragNode.emit(Topics.NodePositionMoved)
        console.log("node position moved")
      }
    ) 

    this.register(
      States.Stoped,
      States.Start,
      Actions.AUTO,
      () => {
      }
    ) 
    
  }

   describeAddComponent(){
    let componentToPlace = null
    let addVector  = [0, 0]
    this.register(
      States.Start,
      States.PlacingComponent,
      Actions.StartAddComponent,
      (meta) => {
        componentToPlace = meta
      }
    )

    this.register(
      States.PlacingComponent,
      States.PlacingComponent,
      Actions.EvtDrag,
      (vec ) => {
        console.log('handle, placing', vec)
        addVector = vec
      }
    )

    this.register(
      States.PlacingComponent,
      States.AddingComponent,
      Actions.EvtDrop,
      () => {
        if(!componentToPlace) {
          throw new Error("no component to create")
        }
        console.log('placing component')
        const node = new Node(
          componentToPlace.type,
          addVector[0] - componentToPlace.w / 2 - 100,
          addVector[1] - componentToPlace.h / 2,
          componentToPlace.w,
          componentToPlace.h,
        )

        console.log(node.printData())
        this.root.add(node)
        this.root.emit(Topics.NodeChildrenUpdated)
      }
    )

    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log("auto reset state")
    })

  }
	getRoot(){
    return this.root
  }
}