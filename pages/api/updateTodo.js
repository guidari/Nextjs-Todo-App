import { table, getMinifiedRecords } from './utils/airtable'
import auth0 from './utils/auth0'
import OwnsRecord from './middleware/OwnsRecord'

export default OwnsRecord(async (req, res) => {
  const { id, fields } = req.body;
  const {user} = await auth0.getSession(req);

  try {
    const updatedRecords = await table.update([{id, fields}]);
    res.statusCode = 200
    res.json(getMinifiedRecords(updatedRecords[0]));
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }

});
