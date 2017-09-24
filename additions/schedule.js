import Agenda from "agenda";

import config from '../config/config'
import Event from '../models/eventModel'

const { values: { paymentExpiresAt }, database } = config;
const agenda = new Agenda({ db: { address: database } })


agenda.define('delete old events', (job, done) => {
  const date = new Date();
  date.setHours(date.getHours() - paymentExpiresAt)
  Event.remove({ createdAt: { $lt: date } }, done)
  console.log('Agenda "delete old events" complited: ', date.toLocaleTimeString())
})

export default agenda;