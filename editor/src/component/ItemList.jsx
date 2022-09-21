// import Editor from '../object/Editor'
import { Actions ,Metas } from '../constant'
import classes from './drag-drop.module.scss'


export default ({editor}) => {
  return <div class={classes['item-list']}>
		{Metas.map(item => {
			return (
        <div
          draggable={true}
          onDragstart={(e) => {
            console.log('onDragStart')
            editor.dispatch(Actions.StartAddComponent, item)
          }}
          class={classes["item"]}
          key={item.type}
        >
          {item.title}
        </div>
      )
		})}
	</div>
}