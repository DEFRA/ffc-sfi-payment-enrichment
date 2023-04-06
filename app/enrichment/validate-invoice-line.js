const { VALIDATION } = require('../constants/errors')
const schema = require('./schemas/invoice-line')

const validateInvoiceLine = (invoiceLine, sourceSystem) => {
  const validationResult = schema.validate({ ...invoiceLine, sourceSystem }, { abortEarly: false })
  if (validationResult.error) {
    const error = new Error(`Invoice line is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateInvoiceLine
