const config = {
  secret: "super",
  database: "mongodb://develop:examplepass@ds055742.mlab.com:55742/backendcrm",
  paymentExpiresAt: 1
};

export const changeConfig = (field, value) => {
  if (value && config[field] && value !== 'secret' && value !== 'database') {
    config[field] = value
  } else {
    throw Error("Wrong request")
  }
}

export default config
