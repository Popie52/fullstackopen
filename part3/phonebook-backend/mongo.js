import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

const numberValidator = {
  validator: function (value) {
    return /^\d{2,3}-\d+$/.test(value) && value.length >= 8
  },
  message: (props) =>
    `${props.value} is not valid phone number! Format must be XX-XXXX... or XXX-XXXX...`,
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: numberValidator,
  },
})

Schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Phonebook = mongoose.model('Phonebook', Schema)

export default Phonebook
