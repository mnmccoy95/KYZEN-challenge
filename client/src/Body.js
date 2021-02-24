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

//----------------------This component defines the entirety of the body display----------------------

export const Body = () => {
  //-------Used when editing limits and changing unit type-------

  // const [data, setData] = useState(Data);
  // const [editing, setEditing] = useState(false);
  const [units, setUnits] = useState("°C");


  //-------Used for creating KYZEN Material UI theme-------

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


  //-------Data for Chart.js representations-------
  let temps = ChartData.map((pair) => { return pair.temp })
  const concs = ChartData.map((pair) => { return pair.conc })

  //-------References for adding chart components to canvases-------
  const concChart = useRef();
  const tempChart = useRef();
  const compareChart = useRef();

  //-------Predefine possible chart colors-------
  var chartColors = {
    green: 'rgb(171,204,109)',
    blue: 'rgb(34,61,114)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0,0,0)'
  };

  //-------set chart default for easy viewing-------
  Chart.defaults.global.defaultFontColor = "#fff";

  //-------scatter data for Chart.js component-------
  let scatterData = ChartData.map((pair) => {
    return { x: pair.temp, y: pair.conc }
  })

  //-------Re-Renders charts based on state-------
  useEffect(() => {
    //-------Concentration line chart-------
    new Chart(concChart.current, {
      type: "line",
      data: {
        //-------Temporary arbitrary labels for time based points-------
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
      //-------Customization for chart display-------
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Concentration (%) vs. Time (units)',
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
            },
          }]
        }
      }
    })

    //-------Temperature line chart-------
    new Chart(tempChart.current, {
      type: "line",
      data: {
        //-------Temporary arbitrary labels for time based points-------
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
      //-------Customization for chart display-------
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: `Temperature ${units} vs. Time (units)`,
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
            },
          }]
        }
      }
    })

    //-------Concentration vs. Temperature Scatter Chart-------
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
      //-------Customization for chart display-------
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
            },
          }]
        }
      }
    })
  }, [])


  //-------HTML Return-------
  return (
    <ThemeProvider theme={theme}>
      <div className="bodyContainer">
        {
          //-------Entire left side of display-------
        }
        <Box height="100%" className="columnA">
          {
            //-------Current reading containers-------
          }
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
          {
            //-------Limit box and data table-------
          }
          <Box width="100%" className="rowB">
            <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" >
              {
                //-------Limits header-------
              }
              <Box borderBottom={1} className="limitsTitle">
                <div className="placeholder"></div>
                <div>LIMITS</div>
                <Button variant="contained" color="secondary" disableElevation className="editLimitBtn">
                  EDIT
                </Button>
              </Box>
              {
                //-------Concentration limit container-------
              }
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
              {
                //-------Temperature limit container-------
              }
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
            {
              //-------Data table-------
            }
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
        {
          //-------Entire left side of display-------
        }
        <Box height="99.5%" className="columnB">
          <Box height="100%" border={3} borderColor="white" borderRadius={30} color="white" className="chartContainer">
            Historical Data
            {
              //-------Concentration chart-------
            }
            <div className="canvasContainer">
              <canvas ref={concChart} height="200" width="500" className="concChart" />
            </div>
            {
              //-------Temperature chart-------
            }
            <div className="canvasContainer">
              <canvas ref={tempChart} height="200" width="500" className="concChart" />
            </div>
            {
              //-------Scatter chart-------
            }
            <div className="canvasContainer">
              <canvas ref={compareChart} height="200" width="500" className="concChart" />
            </div>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}