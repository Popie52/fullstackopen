const Search = ({msg, handleChange}) => {
    return(
        <div>
            find countries <input type={msg} onChange={handleChange} />
        </div>
    )
}

export default Search;