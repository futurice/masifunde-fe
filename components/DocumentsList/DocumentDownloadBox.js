import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { rem } from '../../styling/typography'
import { extraExtraSmallSpacing } from '../../styling/sizes'
import { wordBreak } from '../../styling/utils'

const BoxContainer = styled.a`
  align-items: center;
  border-radius: 8px;
  border: solid 2px rgba(179, 170, 161, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 130px;
  padding: 1rem;
  transition: background-color 0.2s, border 0.2s;
  width: 160px;

  :hover,
  :focus {
    background-color: rgba(254, 153, 51, 0.1);
    border: solid 2px ${({ theme }) => theme.orange};
    text-decoration: none;
  }
`

const Headline = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: ${rem('16px')};
  font-weight: bold;
  max-width: 100%;
  text-align: center;
  ${wordBreak};
`

const DownloadIcon = styled.div`
  background: url('/static/images/icon-download.svg') no-repeat;
  height: 70px;
  margin-bottom: ${extraExtraSmallSpacing};
  width: 48px;
`

const Box = ({ title, fileUrl }) => (
  <BoxContainer href={fileUrl} download>
    <DownloadIcon />
    <Headline>{title}</Headline>
  </BoxContainer>
)

Box.propTypes = {
  title: PropTypes.string.isRequired,
  fileUrl: PropTypes.string.isRequired,
}

export default Box
