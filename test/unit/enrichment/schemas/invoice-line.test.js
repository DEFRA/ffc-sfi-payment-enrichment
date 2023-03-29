const { ACCOUNT_CODE } = require('../../../mocks/values/account-code')
const { FUND_CODE } = require('../../../mocks/values/fund-code')
const { GROSS_DESCRIPTION } = require('../../../mocks/values/description')

const schema = require('../../../../app/enrichment/schemas/invoice-line')

let invoiceLine

describe('invoice line schema', () => {
  beforeEach(() => {
    invoiceLine = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/invoice-line')))
  })

  test('should pass validation if all properties valid', () => {
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should pass validation if standard code is missing', () => {
    delete invoiceLine.standardCode
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should fail validation if scheme code is missing', () => {
    delete invoiceLine.schemeCode
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should pass validation if account code is missing', () => {
    delete invoiceLine.accountCode
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should pass validation if account code is correct format', () => {
    invoiceLine.accountCode = ACCOUNT_CODE
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should fail validation if account code is incorrect format', () => {
    invoiceLine.accountCode = '123456789'
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should fail validation if fund code is missing', () => {
    delete invoiceLine.fundCode
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should pass validation if fund code is correct format', () => {
    invoiceLine.fundCode = FUND_CODE
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should fail validation if fund code is incorrect format', () => {
    invoiceLine.fundCode = '123456789'
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should fail validation if description is missing', () => {
    delete invoiceLine.description
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should fail validation if description is incorrect format', () => {
    invoiceLine.description = '123456789'
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should pass validation if description is correct format', () => {
    invoiceLine.description = GROSS_DESCRIPTION
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should fail validation if value is missing', () => {
    delete invoiceLine.value
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should fail validation if value is not a number', () => {
    invoiceLine.value = 'not a number'
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should fail validation if value is not an integer', () => {
    invoiceLine.value = 1.1
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should pass validation if convergence missing', () => {
    delete invoiceLine.convergence
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should fail validation if convergence is not a boolean', () => {
    invoiceLine.convergence = 'not a boolean'
    expect(schema.validate(invoiceLine).error).toBeDefined()
  })

  test('should pass validation if convergence is true', () => {
    invoiceLine.convergence = true
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })

  test('should pass validation if convergence is false', () => {
    invoiceLine.convergence = false
    expect(schema.validate(invoiceLine)).toBeTruthy()
  })
})