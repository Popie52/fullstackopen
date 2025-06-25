import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const showVisible = { display: visible? 'none': ''}
    const hideVisible = { display: visible? '' : 'none' }
    
    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return{
            toggleVisibility
        }
    })
    
    return (
        <div>
            <div style={showVisible}>
                <button onClick={toggleVisibility}>{props.label}</button>
            </div>
            <div style={hideVisible}>
                {props.children}
            </div>
        </div>
    )
})

export default Togglable;