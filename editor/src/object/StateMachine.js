import { Emiter } from "./Emiter";


export class StateMachine extends Emiter {
  constructor(initialState) {
    super()
    this.state = initialState
    this.transferTable = new Map()
  }

  addTransfer(
    from,
    to,
    action,
    fn
  ) {
		if(!this.transferTable.has(from)) {
			this.transferTable.set(from, new Map())
		}

		const adjTable = this.transferTable.get(from)

		adjTable?.set(action, [fn, to])
	}

  register(
    from,
    to,
    action,
    fn
  ) {
    if (Array.isArray(from)) {
      from.forEach(s => {
				this.addTransfer(s, to, action, fn)
			})
    } else {
      this.addTransfer(from ,to ,action, fn)
    }
  }

	dispatch(action, ...data) {
		const adjTable = this.transferTable.get(this.state)

		const transfer = adjTable?.get(action)
		if(!transfer) {
			return false
		}
		const [fn, nextS] = transfer
		fn(...data)
		this.state = nextS

		while(this.dispatch("<auto>" , ...data));
		return true
	}
} 