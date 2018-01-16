import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import PageSection from './PageSection'
import SubHeader from './SubHeader'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'
import { fundraisingFormSpacing } from '../../utils/constants'
import { smBreakpoint } from '../../styling/breakpoints'

const CountryLabelContainer = styled.div`
  width: 100%;
  margin-right: ${fundraisingFormSpacing};
  
  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
`

const DonationProjectField = ({
  deProjectId,
  fieldName,
  markdownDe,
  markdownSa,
  saProjectId,
  title,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <PageSection>
        <SubHeader className="row">{title}</SubHeader>
        <div className="row">
          <CountryLabelContainer data-toggle="buttons">
            <LabelButton
              className="btn"
              isActive={input.value === saProjectId}
              htmlFor="countryInputSa"
            >
              <input
                {...input}
                type="radio"
                value={saProjectId}
                id="countryInputSa"
                autoComplete="off"
              />
              {markdownSa}
            </LabelButton>
          </CountryLabelContainer>
          <CountryLabelContainer>
            <LabelButton
              className="btn"
              isActive={input.value === deProjectId}
              htmlFor="countryInputDe"
            >
              <input
                {...input}
                type="radio"
                value={deProjectId}
                id="countryInputDe"
                autoComplete="off"
              />
              {markdownDe}
            </LabelButton>
          </CountryLabelContainer>
        </div>
        <ErrorMessage meta={meta} />
      </PageSection>
      )}
  </Field>
)

DonationProjectField.propTypes = {
  deProjectId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  markdownDe: PropTypes.string.isRequired,
  markdownSa: PropTypes.string.isRequired,
  saProjectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default DonationProjectField
