const db = require('../../../app/data')
const enrichPaymentRequest = require('../../../app/enrichment')
let scheme
let sourceSystem
let schemeCode
let fundCode
let deliveryBody
let paymentRequest
let frn

describe('enrich payment request', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    scheme = {
      schemeId: 1,
      name: 'SFI',
      active: true
    }

    deliveryBody = {
      schemeId: 1,
      deliveryBody: 'SFI'
    }

    frn = {
      sbi: 123456789,
      frn: 1234567890
    }

    paymentRequest = {
      sourceSystem: 'SFIP',
      deliveryBody: 'RP00',
      invoiceNumber: 'SFI00000001',
      frn: 1234567890,
      sbi: 123456789,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000000001',
      contractNumber: 'SFIP000001',
      marketingYear: 2022,
      currency: 'GBP',
      schedule: 'M12',
      dueDate: '2021-08-15',
      value: 150.00,
      invoiceLines: [
        {
          standardCode: '80001',
          accountCode: 'SOS273',
          fundCode: 'DRD10',
          description: 'G00 - Gross value of claim',
          value: 250.00
        },
        {
          standardCode: '80001',
          accountCode: 'SOS273',
          fundCode: 'DRD10',
          description: 'P02 - Over declaration penalty',
          value: -100.00
        }
      ]
    }

    sourceSystem = {
      sourceSystemId: 1,
      schemeId: 1,
      name: 'SFIP'
    }

    schemeCode = {
      schemeCodeId: 1,
      standardCode: '80001',
      schemeCode: '80001'
    }

    fundCode = {
      schemeId: 1,
      fundCode: 'DRD10'
    }

    await db.scheme.create(scheme)
    await db.sourceSystem.create(sourceSystem)
    await db.schemeCode.create(schemeCode)
    await db.fundCode.create(fundCode)
    await db.deliveryBody.create(deliveryBody)
    await db.frn.create(frn)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should error for empty payment request', async () => {
    paymentRequest = {}

    try {
      await enrichPaymentRequest(paymentRequest)
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  test('should error for payment request without invoice lines', async () => {
    delete paymentRequest.invoiceLines

    try {
      await enrichPaymentRequest(paymentRequest)
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })
})