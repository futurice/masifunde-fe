import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { fundraisingFormSpacing } from '../../utils/constants'
import { smBreakpoint } from '../../styling/breakpoints'
import PageSection from './PageSection'
import SubHeader from './SubHeader'
import RadioButton from './RadioButton'
import ErrorMessage from './ErrorMessage'

const CountryLabelContainer = styled.div`
  margin-right: ${fundraisingFormSpacing};
  width: 100%;

  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
`

const ProjectFormSection = ({
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
            <RadioButton
              {...input}
              id="countryInputSa"
              label={markdownSa}
              value={saProjectId}
              isActive={input.value === saProjectId}
            />
          </CountryLabelContainer>
          <CountryLabelContainer>
            <RadioButton
              {...input}
              id="countryInputDe"
              label={markdownDe}
              value={deProjectId}
              isActive={input.value === deProjectId}
            />
          </CountryLabelContainer>
        </div>
        <ErrorMessage meta={meta} />
      </PageSection>
    )}
  </Field>
)

ProjectFormSection.propTypes = {
  deProjectId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  markdownDe: PropTypes.string.isRequired,
  markdownSa: PropTypes.string.isRequired,
  saProjectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ProjectFormSection
