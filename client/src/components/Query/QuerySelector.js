import { InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import { setSortField, setSortOrder } from '../../redux/actions';

const SelectWrapper = styled.div`
  display: flex;
`

const QuerySelector = (props) => {

  const handleSortFieldChange = (event) => {
    props.setSortField(event.target.value)
  }

  const handleSortOrderChange = (event) => {
    props.setSortOrder(event.target.value)
  }

  return (
    <SelectWrapper>
      <FormControl variant="filled" disabled={props.loading} sx={{ m: 1, minWidth: 288 }}>
        <InputLabel>Sort Field</InputLabel>
        <Select defaultValue="name" value={props.sortField} onChange={handleSortFieldChange}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="yds">Total Rushing Yards (Yds)</MenuItem>
          <MenuItem value="lng">Longest Rush (Lng)</MenuItem>
          <MenuItem value="td">Total Rushing Touchdowns (TD)</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" disabled={props.loading} sx={{ m: 1, minWidth: 160 }}>
        <InputLabel>Sort Order</InputLabel>
        <Select defaultValue="asc" value={props.sortOrder} onChange={handleSortOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl> 
    </SelectWrapper>
  );
}

QuerySelector.propTypes = {
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  loading: PropTypes.bool,
  setSortField: PropTypes.func,
  setSortOrder: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    sortField: state.rushingStats.sortField,
    sortOrder: state.rushingStats.sortOrder,
    loading: state.rushingStats.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSortField: (sortField) => dispatch(setSortField(sortField)),
    setSortOrder: (sortOrder) => dispatch(setSortOrder(sortOrder)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuerySelector)