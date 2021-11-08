import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loadTable } from '../redux/actions';

const TableWrapper = styled.div`
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
  min-height: 590px;
`

class Table extends React.Component {
  componentDidMount() {
    this.props.loadTable()
  }

  render() {
    return (
      <TableWrapper>
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell width="20%" align="center">Player</TableCell>
              <TableCell width="7%" align="center">Team</TableCell>
              <TableCell width="7%" align="center">Pos</TableCell>
              <TableCell width="7%" align="center">Att/G</TableCell>
              <TableCell width="7%" align="center">Yds</TableCell>
              <TableCell width="7%" align="center">Avg</TableCell>
              <TableCell width="7%" align="center">Yds/G</TableCell>
              <TableCell width="7%" align="center">TD</TableCell>
              <TableCell width="7%" align="center">Lng</TableCell>
              <TableCell width="7%" align="center">1st</TableCell>
              <TableCell width="7%" align="center">1st%</TableCell>
              <TableCell width="7%" align="center">20+</TableCell>
              <TableCell width="7%" align="center">40+</TableCell>
              <TableCell width="7%" align="center">FUM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.playerList.map(player => {
              return (
                <TableRow key={player.id}>
                  <TableCell align="center">{player["Player"]}</TableCell>
                  <TableCell align="center">{player["Team"]}</TableCell>
                  <TableCell align="center">{player["Pos"]}</TableCell>
                  <TableCell align="center">{player["Att/G"]}</TableCell>
                  <TableCell align="center">{player["Yds"]}</TableCell>
                  <TableCell align="center">{player["Avg"]}</TableCell>
                  <TableCell align="center">{player["Yds/G"]}</TableCell>
                  <TableCell align="center">{player["TD"]}</TableCell>
                  <TableCell align="center">{player["Lng"]}</TableCell>
                  <TableCell align="center">{player["1st"]}</TableCell>
                  <TableCell align="center">{player["1st%"]}</TableCell>
                  <TableCell align="center">{player["20+"]}</TableCell>
                  <TableCell align="center">{player["40+"]}</TableCell>
                  <TableCell align="center">{player["FUM"]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </TableContainer>
      </TableWrapper>
    )
  }
}

Table.propTypes = {
  playerList: PropTypes.array,
  loadTable: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    playerList: state.rushingStats.playerList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTable: () => dispatch(loadTable()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)