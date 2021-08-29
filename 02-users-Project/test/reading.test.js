const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let ahmed, hatem, hossam, walid

  beforeEach((done) => {
    ahmed = new User({ name: 'Ahmed' })
    hatem = new User({ name: 'Hatem' })
    hossam = new User({ name: 'Hossam' })
    walid = new User({ name: 'Walid' })

    Promise.all([ahmed.save(), walid.save(), hossam.save(), hatem.save()]).then(
      () => done()
    )
  })

  it('finds all users with a name of hatem', (done) => {
    User.find({ name: 'Hatem' }).then((users) => {
      assert(users[0]._id.toString() === hatem._id.toString())
      done()
    })
  })

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: hatem._id }).then((user) => {
      assert(user.name === 'Hatem')
      done()
    })
  })

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // 1: ascending, -1: descending
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2)
        assert(users[0].name === 'Hatem')
        assert(users[1].name === 'Hossam')
        done()
      })
  })
})
