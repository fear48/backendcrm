import Agenda from "agenda";

import config from '../config/config'
import Event from '../models/eventModel'

const { database } = config;
const agenda = new Agenda({ db: { address: database } })


agenda.define('delete old events', (job, done) => {
  const { values: { paymentExpiresAt } } = config;
  const date = new Date();
  date.setHours(date.getHours() - paymentExpiresAt)
  Event.remove({ createdAt: { $lt: date }, paid: false }, done)
  console.log('Agenda "delete old events" complited: ', date.toLocaleTimeString())
})

export default agenda;