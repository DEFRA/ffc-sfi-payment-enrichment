const validateHeader = require('../../../app/enrichment/validate-header')

describe('validate header', () => {
  test('does not error if all values present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      ledger: 'AP',
      deliveryBody: 'RP00',
      invoiceNumber: 'SFI12345678',
      frn: 1111111111,
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      schedule: 'Q4',
      dueDate: '01/11/2021',
      debtType: 'irr',
      recoveryDate: '01/03/2021',
      originalSettlementDate: '01/03/2021',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).not.toThrow()
  })

  test('does error if source system not present', () => {
    const paymentRequest = {
      schemeId: 1,
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if scheme not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if marketing year not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      sbi: 111111111,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if payment request number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if agreement number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if contract number not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      currency: 'GBP',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if currency not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      value: 100,
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if value not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      invoiceLines: []
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })

  test('does error if invoice lines not present', () => {
    const paymentRequest = {
      sourceSystem: 'SFIP',
      schemeId: 1,
      invoiceNumber: 'SFI12345678',
      sbi: 111111111,
      marketingYear: 2021,
      paymentRequestNumber: 1,
      agreementNumber: 'AG12345678',
      contractNumber: 'SFIP123456',
      currency: 'GBP',
      value: 100
    }
    expect(() => validateHeader(paymentRequest)).toThrow()
  })
})
