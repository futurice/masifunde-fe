import { render } from '@testing-library/react'
import DonationForm from './DonationForm'
import { DonationFormValues } from './data/donation-form-values'

test('renders', () => {
  const amounts = [
    { value: 10, text: '10€' },
    { value: 20, text: '20€' },
    { value: 30, text: '30€' },
  ]

  const intervals = [
    { name: 'Once', value: '0' },
    { name: 'Monthly', value: '1' },
    { name: 'Yearly', value: '2' },
  ]

  const initialValues: Partial<DonationFormValues> = {
    projectId: '3522',
  }

  const { getByText } = render(
    <DonationForm
      formTitle={'What would you like to donate for?'}
      projectHeadline={'What would you like to donate for?'}
      buttonProjectDeText={'Projects in Germany'}
      buttonProjectSaText={'Projects in South Africa'}
      intervalTitle={'How often would you like to donate?'}
      intervals={intervals}
      amountTitle="How much would you like to donate?"
      amounts={amounts}
      otherAmountPlaceholder={'Other Amount'}
      fundraisingboxIframeTitle={'Payment Method'}
      fundraisingboxFormHash="abc123"
      initialValues={initialValues}
      enableProjectSelection
      enableOtherAmount
      iframeStatus={null}
    />
  )

  for (const amount of amounts) {
    expect(getByText(amount.text)).toMatchSnapshot()
  }
})
