import React from "react";
import Box from '@material-ui/core/Box';

export const Body = () => {

  return (
    <div className="bodyContainer">
      <Box height="100%" className="columnA">
        <Box width="100%" height="35%" className="rowA">
          <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" className="currentConcContainer">
            box to display conc. %
          </Box>
          <Box width="49.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" className="currentConcContainer">
            box to display temp
          </Box>
        </Box>
        <Box width="100%" height="65%" className="rowB">
          <Box width="39.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" className="currentConcContainer">
            box to display limits
          </Box>
          <Box width="59.5%" height="99%" border={3} borderColor="white" borderRadius={30} color="white" className="currentConcContainer">
            box to display chart
          </Box>
        </Box>
      </Box>
      <Box height="99.5%" className="columnB">
        <Box height="100%" border={3} borderColor="white" borderRadius={30} color="white" className="currentConcContainer">
          box to display charts
        </Box>
      </Box>
    </div>
  );
}