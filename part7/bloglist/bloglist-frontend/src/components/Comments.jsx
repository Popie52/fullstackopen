import { addComments, initializeComments } from "../reducers/commentReducer.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({id}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    useEffect(() => {
        dispatch(initializeComments(id));
    }, []);

    if(!comments ) {
        return(
            <div>no comments yet...</div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {comment: e.target.comment.value};
        e.target.comment.value = '';
        dispatch(addComments(id, comment));
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input type="text" name="comment" placeholder="comment" />
                <button type="submit">add comment</button>
            </form>
        <ul>
            {comments.length !== 0 ?comments.map(comment => <li key={comment.id}>{comment.comment}</li>): <div>no comments yet...</div>}
        </ul>
        </div>
    )
}

export default Comments;