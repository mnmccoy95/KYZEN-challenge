import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import { Data } from "./Data"
import { ChartData } from "./ChartData"
import Button from '@material-ui/core/Button'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const Body = () => {
  // const [data, setData] = useState(Data);
  // const [editing, setEditing] = useState(false);
  const [units, setUnits] = useState("°C");

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#223D72',
      },
      secondary: {
        main: '#ABCC6D',
        contrastText: '#ffffff'
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div className="bodyContainer">
        <Box height="100%" className="columnA">
          <Box width="100%" className="rowA">
            <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" >
              <Box borderBottom={1} className="concTitle">Concentration (by vol.)</Box>
              <Box className="currentValue" >
                {Data.Conc}%
              </Box>
            </Box>
            <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" >
              <Box borderBottom={1} className="tempTitle">
                <div>Temperature</div>
                <Button variant="contained" color="secondary" disableElevation className="unitButton">
                  UNIT CHANGE
                </Button>
              </Box>
              <Box className="currentValue" >
                {Data.Temp}{units}
              </Box>
            </Box>
          </Box>
          <Box width="100%" className="rowB">
            <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" >
              <Box borderBottom={1} className="limitsTitle">
                <div className="placeholder"></div>
                <div>LIMITS</div>
                <Button variant="contained" color="secondary" disableElevation className="editLimitBtn">
                  EDIT
                </Button>
              </Box>
              <Box border={2} borderColor="white" borderRadius={30} color="white" className="limitContainer">
                <Box borderBottom={2} borderColor="white" className="minMaxTitle">
                  Concentration (%)
                </Box>
                <Box borderBottom={1} borderColor="white" className="minMaxContainer">
                  <div className="minMaxLabel">
                    MIN
                  </div>
                  <div className="limitValue">
                    {Data.ConcLimit.Lower}
                  </div>
                </Box>
                <Box className="minMaxContainer">
                  <div className="minMaxLabel">
                    MAX
                  </div>
                  <div className="limitValue">
                    {Data.ConcLimit.Upper}
                  </div>
                </Box>
              </Box>
              <Box border={2} borderColor="white" borderRadius={30} color="white" className="limitContainer">
                <Box borderBottom={2} borderColor="white" className="minMaxTitle">
                  Temperature ({units} )
                </Box>
                <Box borderBottom={1} borderColor="white" className="minMaxContainer">
                  <div className="minMaxLabel">
                    MIN
                  </div>
                  <div className="limitValue">
                    {Data.TempLimit.Lower}
                  </div>
                </Box>
                <Box className="minMaxContainer">
                  <div className="minMaxLabel">
                    MAX
                  </div>
                  <div className="limitValue">
                    {Data.TempLimit.Upper}
                  </div>
                </Box>
              </Box>
            </Box>
            <Box width="49.5%" border={3} borderColor="white" borderRadius={30} color="white" >
              <TableContainer className="dataTable">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Conc. (%)</TableCell>
                      <TableCell align="center">Temp. ({units})</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ChartData.map((row) => {
                      return (
                        <TableRow>
                          <TableCell align="center">{row.conc}</TableCell>
                          <TableCell align="center">{row.temp}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box height="99.5%" className="columnB">
          <Box height="100%" border={3} borderColor="white" borderRadius={30} color="white" >
            box to display charts
        </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}