const Persons = ({persons}) => {
    return (
        <div>
        {
            persons.map((e,id) => <p key={id}>{e.name} {e.number}</p>)
        }
        </div>
    )
}

export default Persons;