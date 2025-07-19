import { useState } from "react"
import { EDIT_AUTHOR } from "../queries";
import { useMutation } from '@apollo/client';
import Select from 'react-select';

const BirthForm = ({authors}) => {
    const [name, setName] = useState(null);
    const [born, setBorn] = useState('');

    const options = authors.map(e => ({value: e.name, label: e.name}));

    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const submit = async (e) => {
        e.preventDefault();

        editAuthor({ variables: { name: name.value, born: Number(born) }})

        setName('');
        setBorn('');
    }

  return (
    <div>
        <h2>Set BirthYear</h2>
        <form onSubmit={submit}>
            <div>
                name 
                <Select
                defaultValue={name}
                onChange={setName}
                options={options}
                />
            </div>
            <div>
                born <input value={born} onChange={({target}) => setBorn(target.value)} />
            </div>
            <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default BirthForm