import { FC } from 'react'
import styled from 'styled-components'
import { Document } from '../../content/dokumente-content'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraExtraSmallSpacing } from '../../styling/sizes'
import DocumentDownloadBox from './DocumentsListItem'

// Props
// =====

type Props = {
  documents: Document[]
  expandList?: boolean
}

// Helpers
// =======

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
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

// Component
// =========

const DocumentsList: FC<Props> = ({ expandList, documents }) => (
  <>
    {expandList ? (
      <div className="row">
        {documents.map(({ longTitle, description, file: { file } }) => (
          <BoxContainerCol className="col-md-6" key={file.url}>
            <div className="row">
              <ContentContainer className="col-sm-auto">
                <DocumentDownloadBox
                  title={document.title}
                  fileUrl={file.url}
                />
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
        {documents.map(({ title, file: { file } }) => (
          <BoxContainerCol
            key={file.url}
            className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto"
          >
            <DocumentDownloadBox title={title} fileUrl={file.url} />
          </BoxContainerCol>
        ))}
      </div>
    )}
  </>
)

export default DocumentsList
