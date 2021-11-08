import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { downloadCsv, setDefault } from '../../redux/actions';

const ButtonWrapper = styled.div`
  display: flex;
`

const QueryButtons = (props) => {

  const handleButtonReset = () => {
    props.setDefault()
  }
    
  const handleButtonCSV = () => {
    props.downloadCsv()
  }

  return (
    <ButtonWrapper>
      <Button 
        variant="outlined"
        sx={{ m: 1, minWidth: 160 }}
        disabled={props.loading}
        onClick={handleButtonReset}>
        Reset
      </Button>
      <Button 
        variant="contained"
        sx={{ m: 1, minWidth: 160 }}
        disabled={props.loading} 
        onClick={handleButtonCSV}>
        Download CSV
      </Button>
    </ButtonWrapper>
  )
}

QueryButtons.propTypes = {
  loading: PropTypes.bool,
  setDefault: PropTypes.func,
  downloadCsv: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
      loading: state.rushingStats.loading,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setDefault: () => dispatch(setDefault()),
      downloadCsv: () => dispatch(downloadCsv()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QueryButtons)