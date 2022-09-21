import { Render } from "./Render"
import classes from './drag-drop.module.scss'
import { Actions } from "../constant"

export const Panel = ({editor}) => {
  return (
    <div
      class={classes.panel}
      onDragover={(e) => {
        e.preventDefault()
        editor.dispatch(Actions.EvtDrag, [
          e.clientX,
          e.clientY,
        ])
      }}
      onDrop={(e) => {
        e.preventDefault()
        editor.dispatch(Actions.EvtDrop)
      }}
    >
      <Render node={editor.getRoot()} />
    </div>
  )
}