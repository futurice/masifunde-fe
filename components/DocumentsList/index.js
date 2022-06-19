import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FilePropType from '../../propTypes/file'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraExtraSmallSpacing } from '../../styling/sizes'
import DocumentDownloadBox from './DocumentDownloadBox'

const Title = styled.p`
  font-weight: bold;
  margin-bottom: ${extraExtraSmallSpacing};
  margin-top: ${extraExtraSmallSpacing};

  @media (min-width: ${smBreakpoint}) {
    margin-top: 0;
  }
`

const Description = styled.p`
  margin: 0;
`

const BoxContainerCol = styled.div`
  margin-bottom: 30px; // To match up bootstrap gutters
  display: flex;
  justify-content: center;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const Document = ({ expandList, documents }) => (
  <Fragment>
    {expandList ? (
      <div className="row">
        {documents.map(({ title, longTitle, description, file }) => (
          <BoxContainerCol className="col-md-6" key={file.url}>
            <div className="row">
              <ContentContainer className="col-sm-auto">
                <DocumentDownloadBox title={title} fileUrl={file.url} />
              </ContentContainer>
              <ContentContainer className="col">
                <Title>{longTitle}</Title>
                <Description>{description}</Description>
              </ContentContainer>
            </div>
          </BoxContainerCol>
        ))}
      </div>
    ) : (
      <div className="row">
        {documents.map(({ title, file }) => (
          <BoxContainerCol
            key={file.url}
            className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto"
          >
            <DocumentDownloadBox title={title} fileUrl={file.url} />
          </BoxContainerCol>
        ))}
      </div>
    )}
  </Fragment>
)

Document.propTypes = {
  expandList: PropTypes.bool,
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      longTitle: PropTypes.string,
      title: PropTypes.string,
      file: PropTypes.shape(FilePropType),
    })
  ),
}

Document.defaultProps = {
  expandList: false,
  documents: [],
}

export default Document
