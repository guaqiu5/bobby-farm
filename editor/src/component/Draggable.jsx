import {defineComponent, ref} from 'vue'
import { DragValue } from '../object/DragValue'
import { deepMerge } from '../util/deepMerge'

function useDrag({onDragend, onDragstart}) {
  const value = new DragValue()
  
  const diffX = ref(value.getDiffX())
  const diffY = ref(value.getDiffY())
  const handlers = {
    onDragstart(e) {
      value.start(e)
      onDragstart && onDragstart()
    },
    onDrag(e){
      value.update(e)
      diffX.value = value.getDiffX()
      diffY.value = value.getDiffY()
    },
    onDragend : (e) => {
      value.update(e)
      onDragend && onDragend([value.getDiffX(), value.getDiffY()])
    }
  }


  return {
    handlers,
    diffX,
    diffY
  } 
}

function addPropsToVNode(vNode , props ) {
  vNode.props = deepMerge(vNode.props, props)
  return vNode
}

export const Draggable = defineComponent({
  props : {
    initialPosition : {
      type : Array 
    },
    onDragstart : {
      type : Function 
    },
    onDragend : {
      type : Function 
    }

  },
  setup(props, ctx){

    const {handlers, diffX, diffY} = useDrag({
      onDragstart : props.onDragstart,
      onDragend : props.onDragend 
    })

    return () => {
      let vNode  = ctx.slots.default()[0]
      console.log('props initlal position', props.initialPosition)
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        Draggable : true,
        style : {
          position : 'absolute',
          left : (props.initialPosition?.[0] || 0) + "px",
          top: (props.initialPosition?.[1] || 0) + "px",
          transform : `translate(${diffX.value}px, ${diffY.value}px)`
        }
      })
      return vNode
    }
  }
})
