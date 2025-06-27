import { useDispatch } from "react-redux"
import { filterToggle } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const content = e.target.value
        console.log(content);
        dispatch(filterToggle(content));
    }

    return (
        <div>
            filter <input type="text" name="anecdoteFilter" onChange={handleChange} />
        </div>
    )
}

export default Filter;