import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import { Fab } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setNextPage, setPrevPage } from '../redux/actions';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 16px;
`

const PageNumWrapper = styled.div`
  display: flex;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`

const Paging = (props) => {

  const handlePrevPageChange = () => {
    props.setPrevPage()
  }
    
  const handleNextPageChange = () => {
    props.setNextPage()
  }

  return (
    <ButtonWrapper>
      <Fab
        disabled={props.loading || (props.pageNum <= 1) || (props.error)}
        onClick={handlePrevPageChange}
      >
        <KeyboardArrowLeftSharpIcon />
      </Fab>
      <PageNumWrapper>
        Page {props.pageNum}
      </PageNumWrapper>
      <Fab
        disabled={props.loading || (props.pageNum >= props.endPageNum) || (props.error)}
        onClick={handleNextPageChange}
      >
        <KeyboardArrowRightSharpIcon />
      </Fab>
    </ButtonWrapper>
  )
}

Paging.propTypes = {
  endPageNum: PropTypes.number,
  pageNum: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.any,
  setPrevPage: PropTypes.func,
  setNextPage: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    endPageNum: state.rushingStats.endPageNum,
    pageNum: state.rushingStats.pageNum,
    loading: state.rushingStats.loading,
    error: state.rushingStats.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevPage: () => dispatch(setPrevPage()),
    setNextPage: () => dispatch(setNextPage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paging)
