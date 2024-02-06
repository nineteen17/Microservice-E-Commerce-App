import { useStore } from "../store"

function Counter() {
    const { inc } = useStore()

    return (
      <div>
        <span></span>
        <button onClick={inc}>one up</button>
      </div>
    )
  }

  export default Counter