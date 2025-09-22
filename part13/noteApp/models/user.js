import { Model, DataTypes, Op } from 'sequelize'

import { sequelize } from '../utils/db.js'
import Note from './note.js'

class User extends Model {
  async number_of_notes() {
    return (await this.getNotes()).length
  }
  static async with_notes(limit) {
    return await User.findAll ({
      attributes: {
        include: [[ sequelize.fn("COUNT" , sequelize.col("notes.id")), "note_count" ]]
      },
      include: [
        {
          model: Note,
          attributes: []
        },
      ],
      group: ['user.id'],
      having: sequelize.literal(`COUNT(notes.id) > ${limit}`)
    })
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  scopes: {
    admin: {
      where: { admin: true}
    },
    disabled: {
      where: { disabled: true }
    },
    username(value) {
      return {
        where: {
          username: { 
            [Op.iLike]: value 
          }
        }
      }
    },
  }
})

export default User