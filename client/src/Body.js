import React, { useState, useEffect, useRef } from "react";
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
import Chart from "chart.js";

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

  let temps = ChartData.map((pair) => { return pair.temp })
  const concs = ChartData.map((pair) => { return pair.conc })

  const concChart = useRef();
  const tempChart = useRef();
  const compareChart = useRef();

  var chartColors = {
    green: 'rgb(171,204,109)',
    blue: 'rgb(34,61,114)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0,0,0)'
  };

  Chart.defaults.global.defaultFontColor = "#fff";

  let scatterData = ChartData.map((pair) => {
    return { x: pair.temp, y: pair.conc }
  })

  useEffect(() => {
    new Chart(concChart.current, {
      type: "line",
      data: {
        //Bring in data
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            type: 'line',
            label: `Concentration (%)`,
            borderColor: chartColors.green,
            backgroundColor: chartColors.green,
            data: concs,
            fill: false,

          }
        ],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Concentration (%) vs. Time (units)',
          fontColor: chartColors.white
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontColor: chartColors.white
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Concentration',
              fontColor: chartColors.white
            },
          }]
        }
      }
    })

    new Chart(tempChart.current, {
      type: "line",
      data: {
        //Bring in data
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            type: 'line',
            label: `Temperature ${units}`,
            borderColor: chartColors.green,
            backgroundColor: chartColors.green,
            data: temps,
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: `Temperature ${units} vs. Time (units)`,
          fontColor: chartColors.white
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontColor: chartColors.white
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Temperature',
              fontColor: chartColors.white
            },
          }]
        }
      }
    })

    new Chart(compareChart.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: `Temperature vs. Concentration`,
            borderColor: chartColors.green,
            backgroundColor: chartColors.green,
            data: scatterData,
            pointRadius: 5,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: `Concentration (%) vs. Temperature ${units}`
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Temperature',
              fontColor: chartColors.white
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Concentration',
              fontColor: chartColors.white
            },
          }]
        }
      }
    })
  }, [])

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
          <Box height="100%" border={3} borderColor="white" borderRadius={30} color="white" className="chartContainer">
            Historical Data
            <div className="canvasContainer">
              <canvas ref={concChart} height="200" width="500" className="concChart" />
            </div>
            <div className="canvasContainer">
              <canvas ref={tempChart} height="200" width="500" className="concChart" />
            </div>
            <div className="canvasContainer">
              <canvas ref={compareChart} height="200" width="500" className="concChart" />
            </div>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}