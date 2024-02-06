import { useStore } from "../store";

const Count = () => {
    const {count} = useStore()

    return (
        <>
         <span>{count}</span>
        </>
    )
}

export default Count