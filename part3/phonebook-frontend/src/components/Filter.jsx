const Filter = ({filter, handleFilter}) => {
    return (
        <div>
            <p>filter shown with <input type="text" onChange={handleFilter} value={filter} /></p>
        </div>
    )
}

export default Filter;