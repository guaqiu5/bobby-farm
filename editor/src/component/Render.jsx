import { defineComponent, ref, inject } from 'vue'
import {Node} from '../object/Node'
import { Topics,Actions } from '../constant'
import { Draggable } from './Draggable'

function render(node) {

  switch(node.getType()) {
    case "root" :
      return <Root node={node} />
    case "text":
    case "rect":
    case "image":
      return <ItemRenderForDraggable node={node} />
    default:
      throw new Error(`unsupported node type:${node.getType()}`)
  }
}




function renderItem(node) {
  switch (node.getType()) {
    case "image":
      return (
        <img
          src={
            "https://www.hiorka.com/imgs/logo_1024_1024.png"
          }
          style={{width:'100px',height:'100px'}}
        />
      )
    case "rect":
      return (
        <div
          style={{
            backgroundColor: "yellow",
            width:'100px',
            height:'100px'
          }}
        />
      )
    case "text":
      return <h2>orka！</h2>
  }
}
const ItemRenderForDraggable = ({node}) => {

  const editor = inject('editor')
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragstart={() => {
        editor.dispatch(Actions.EvtDragStart, node)
      }}
      onDragend={(vec) => {
        editor.dispatch(Actions.EvtDragEnd, vec)
        console.log('end')
      }}
    >
      {renderItem(node)}
    </Draggable>
  )
}

const Root = ({node}) => {
  const children = node.getChildren()
  return <div>
    {children.map( (node, i) => {
      return <Render key={i} node={node} />
    })}
  </div>

}


export const Render = defineComponent({
  props : {
    node : {
      type : Node,
      required : true
    }
  },
  setup({node}){
    const ver = ref(0)
    node.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved])
      .subscribe(() => {
        ver.value ++
      })

    return () => {
      return <Dummy key={ver.value} render={() => render(node)} />
    }
  }
})

function Dummy({render}){
  return render()
}