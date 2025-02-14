import Person from '../../models/person.js'

const query = {
  personCount: async () => Person.collection.countDocuments(),
  allPersons: async (root, args) => {
    if (!args.phone) {
      return Person.find({})
    }
    return Person.find({ phone: { $exists: args.phone === 'YES' } })
  },
  findPerson: async (root, args) => Person.findOne({ name: args.name }),
  me: (root, args, context) => {
    return context.currentUser
  }
}

export default query