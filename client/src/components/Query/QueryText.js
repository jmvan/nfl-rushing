import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { setFilterName } from '../../redux/actions';

const QueryText = (props) => {

  const handleFilterNameChange = (event) => {
    props.setFilterName(event.target.value)
  }

  return (
    <TextField 
      label="Search Player Name"
      variant="filled"
      autoFocus={true}
      sx={{ m: 1, minWidth: 400 }}
      disabled={props.loading}
      onChange={handleFilterNameChange}
      value={props.filterName}
    />
  )
}

QueryText.propTypes = {
  filterName: PropTypes.string,
  loading: PropTypes.bool,
  setFilterName: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    filterName: state.rushingStats.filterName,
    loading: state.rushingStats.loading,
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    setFilterName: (filterName) => dispatch(setFilterName(filterName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryText)