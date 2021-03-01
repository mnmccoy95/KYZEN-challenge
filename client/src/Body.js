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
  const [data, setData] = useState(Data);
  const [editing, setEditing] = useState(false);
  const [units, setUnits] = useState("°C");
  const [chartData, setChartData] = useState(ChartData);
  let [tempUp, setTempUp] = useState(data.TempLimit.Upper);
  let [tempDown, setTempDown] = useState(data.TempLimit.Lower);
  let [concUp, setConcUp] = useState(data.ConcLimit.Upper);
  let [concDown, setConcDown] = useState(data.ConcLimit.Lower);

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
  const temps = chartData.map((pair) => { return pair.temp })
  const concs = chartData.map((pair) => { return pair.conc })

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
  let scatterData = chartData.map((pair) => {
    return { x: pair.temp, y: pair.conc }
  })


  //-------Function for when user clicks unit change-------
  //-------Not the dryest code, trust me, I know-------
  const tempConvert = () => {
    if (units === "°C") {
      const newData = data;
      newData.Temp = Math.round((newData.Temp * (9 / 5)) + 32);
      newData.TempLimit.Upper = Math.round((newData.TempLimit.Upper * (9 / 5)) + 32);
      newData.TempLimit.Lower = Math.round((newData.TempLimit.Lower * (9 / 5)) + 32);
      const newChartData = chartData;
      for (const pair of newChartData) {
        pair.temp = Math.round((pair.temp * (9 / 5)) + 32);
      }
      setChartData(newChartData)
      setData(newData);
      setConcDown(data.ConcLimit.Lower);
      setConcUp(data.ConcLimit.Upper);
      setTempDown(data.TempLimit.Lower);
      setTempUp(data.TempLimit.Upper);
      setUnits("°F")
    } else {
      const newData = data;
      newData.Temp = Math.round((newData.Temp - 32) * (5 / 9));
      newData.TempLimit.Upper = Math.round((newData.TempLimit.Upper - 32) * (5 / 9));
      newData.TempLimit.Lower = Math.round((newData.TempLimit.Lower - 32) * (5 / 9));
      const newChartData = chartData;
      for (const pair of newChartData) {
        pair.temp = Math.round((pair.temp - 32) * (5 / 9));
      }
      setChartData(newChartData)
      setData(newData);
      setConcDown(data.ConcLimit.Lower);
      setConcUp(data.ConcLimit.Upper);
      setTempDown(data.TempLimit.Lower);
      setTempUp(data.TempLimit.Upper);
      setUnits("°C")
    }
  }

  //-------Check if temperature is in range-------
  const tempInRange = () => {
    if (data.Temp > data.TempLimit.Upper || data.Temp < data.TempLimit.Lower) {
      return false
    } else {
      return true
    }
  }

  //-------Check if concentration is in range-------
  const concInRange = () => {
    if (data.Conc > data.ConcLimit.Upper || data.Conc < data.ConcLimit.Lower) {
      return false
    } else {
      return true
    }
  }

  //-------Change state if/when user clicks edit/save button-------
  const userEdit = () => {
    if (editing === false) {
      setEditing(true)
    } else {
      setEditing(false)
      data.TempLimit.Upper = tempUp;
      data.TempLimit.Lower = tempDown;
      data.ConcLimit.Upper = concUp;
      data.ConcLimit.Lower = concDown;
    }
  }

  //-------Change state if/when user clicks cancel button-------
  const cancelEditing = () => {
    setEditing(false)
    setTempUp(data.TempLimit.Upper);
    setTempDown(data.TempLimit.Lower);
    setConcUp(data.ConcLimit.Upper);
    setConcDown(data.ConcLimit.Lower);
  }

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
    //-------Check if values are in range on each render-------
    tempInRange();
    concInRange();
  }, [units])


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
              <Box className="currentValue currentConc" >
                {data.Conc}%
              </Box>
              {concInRange() ? null : <div className="warning">!! NOT IN RANGE !!</div>}
            </Box>
            <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" >
              <Box borderBottom={1} className="tempTitle">
                <div>Temperature</div>
                <Button variant="contained" color="secondary" disableElevation className="unitButton"
                  onClick={() => { tempConvert() }}>
                  UNIT CHANGE
                </Button>
              </Box>
              <Box className="currentValue currentTemp" >
                {data.Temp}{units}
              </Box>
              {tempInRange() ? null : <div className="warning">!! NOT IN RANGE !!</div>}
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
                {editing ? <Button variant="contained" color="secondary" disableElevation className="cancelLimitBtn"
                  onClick={() => { cancelEditing() }}>
                  CANCEL
                </Button> :
                  <div className="placeholder"></div>}
                <div>LIMITS</div>
                <Button variant="contained" color="secondary" disableElevation className="editLimitBtn"
                  onClick={() => { userEdit() }}>
                  {editing ? "SAVE" : "EDIT"}
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
                    {editing ? concDown : data.ConcLimit.Lower}
                  </div>
                  {editing ? <div className="buttonContainer"><Button variant="contained" color="secondary" disableElevation
                    onClick={() => { setConcDown(concDown + 1) }}><i class="fas fa-arrow-up"></i></Button>
                    <Button variant="contained" color="secondary" disableElevation
                      onClick={() => { setConcDown(concDown - 1) }}><i class="fas fa-arrow-down"></i></Button></div> : <div className="placeHolderTwo"></div>}
                </Box>
                <Box className="minMaxContainer">
                  <div className="minMaxLabel">
                    MAX
                  </div>
                  <div className="limitValue">
                    {editing ? concUp : data.ConcLimit.Upper}
                  </div>
                  {editing ? <div className="buttonContainer"><Button variant="contained" color="secondary" disableElevation
                    onMouseUp={() => { setConcUp(concUp + 1) }}><i class="fas fa-arrow-up"></i></Button>
                    <Button variant="contained" color="secondary" disableElevation
                      onClick={() => { setConcUp(concUp - 1) }}><i class="fas fa-arrow-down"></i></Button></div> : <div className="placeHolderTwo"></div>}
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
                    {editing ? tempDown : data.TempLimit.Lower}
                  </div>
                  {editing ? <div className="buttonContainer"><Button variant="contained" color="secondary" disableElevation
                    onClick={() => { setTempDown(tempDown + 1) }}><i class="fas fa-arrow-up"></i></Button>
                    <Button variant="contained" color="secondary" disableElevation
                      onClick={() => { setTempDown(tempDown - 1) }}><i class="fas fa-arrow-down"></i></Button></div> : <div className="placeHolderTwo"></div>}
                </Box>
                <Box className="minMaxContainer">
                  <div className="minMaxLabel">
                    MAX
                  </div>
                  <div className="limitValue">
                    {editing ? tempUp : data.TempLimit.Upper}
                  </div>
                  {editing ? <div className="buttonContainer"><Button variant="contained" color="secondary" disableElevation
                    onClick={() => { setTempUp(tempUp + 1) }}><i class="fas fa-arrow-up"></i></Button>
                    <Button variant="contained" color="secondary" disableElevation
                      onClick={() => { setTempUp(tempUp - 1) }}><i class="fas fa-arrow-down"></i></Button></div> : <div className="placeHolderTwo"></div>}
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