import { FC } from 'react'
import styled from 'styled-components'
import { Podcast } from '../../content/podcast-content'
import { smBreakpoint } from '../../styling/breakpoints'
import PodcastCard from './PodcastCard'

// Props
// =====

export type Props = {
  podcasts: Podcast[]
  expandList?: boolean
}

// Helpers
// =======

const BoxContainerCol = styled.div`
  flex: 1 0 32%;
  margin: 5px;
  margin-bottom: 30px;

  @media (max-width: ${smBreakpoint}) {
    display: block;
    min-width: 50%;
  }
`

const Box = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`

// Component
// =========

const PodcastList: FC<Props> = ({ podcasts, expandList }) => (
  <>
    <Box>
      {expandList ? (
        <div className="row">
          {podcasts.map((podcast, index) => (
            <BoxContainerCol className="col-md-6" key={index}>
              <div className="row">
                <PodcastCard podcast={podcast} />
              </div>
            </BoxContainerCol>
          ))}
        </div>
      ) : (
        <div className="row">
          {podcasts.map((podcast, index) => (
            <BoxContainerCol
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto"
              key={index}
            >
              <PodcastCard podcast={podcast} />
            </BoxContainerCol>
          ))}
        </div>
      )}
    </Box>
  </>
)

export default PodcastList
