import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'reactstrap'
import styled, { injectGlobal } from 'styled-components'
import Markdown from './Markdown'

const SourceTooltip = styled(Tooltip)`
  &.tooltip.show {
    opacity: 1 !important;
  }
  .tooltip-inner {    
    color: black; 
    text-align: left;
    background-color: white !important;
    padding: 1.2rem 1.2rem 0.2rem 1.2rem !important;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
    max-width: 90vw !important;
    
    @media screen and (min-width: 576px) {
      max-width: 450px !important;
    }
  }
`

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .tooltip.bs-tooltip-top .arrow::before {
    border-top-color: white !important;
  }
  
  .tooltip.bs-tooltip-bottom .arrow::before {
    border-bottom-color: white !important;
  }
  
  .tooltip.bs-tooltip-left .arrow::before {
    border-left-color: white !important;
  }
  
  .tooltip.bs-tooltip-right .arrow::before {
    border-right-color: white !important;
  }
`

const Span = styled.span`
  display: block;
  margin-bottom: 0.2rem;
  font-weight: bold;
`

const Sup = styled.sup`
  margin-left: 0.1rem;
  cursor: pointer;
`

class Source extends Component {
  state = {
    open: false,
  }
  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }
  render() {
    const {
      text,
      sourceText,
      placement,
      id,
    } = this.props
    return (
      <Fragment>
        <Sup id={`Tooltip-${id}`}>
          {text}
        </Sup>
        <SourceTooltip
          isOpen={this.state.open}
          placement={placement}
          toggle={this.toggle}
          autohide={false}
          target={`Tooltip-${id}`}
        >
          <Span>Source</Span>
          <Markdown source={sourceText} />
        </SourceTooltip>
      </Fragment>
    )
  }
}

Source.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sourceText: PropTypes.string.isRequired,
  id: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
}

Source.defaultProps = {
  placement: 'bottom',
}

export default Source
