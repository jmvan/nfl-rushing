import { Alert } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from './components/Header.js'
import Paging from './components/Paging.js'
import Query from './components/Query/Query.js'
import Table from './components/Table.js';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 10%;
  padding-left: 10%;
`

const TablePagingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const App = (props) => {
  return (
    <AppWrapper>
      <Header />
      <Query />
      {
        props.error ?
          <Alert severity="error">
            Table is unable to load, try starting the server.
          </Alert>
          :
          <TablePagingWrapper>
            <Table />
            <Paging />
          </TablePagingWrapper>
      }
    </AppWrapper>
  )
}

App.propTypes = {
  error: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    error: state.rushingStats.error,
  }
}

export default connect(mapStateToProps)(App)
