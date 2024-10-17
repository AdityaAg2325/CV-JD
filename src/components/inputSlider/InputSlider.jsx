// import React, {useState} from 'react'
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// const InputSlider = () => {

//     function valuetext(value) {
//         return {value};
//       }

//     return (
//         <Box sx={{ width: 300 }}>
//       <Slider
//         aria-label="Temperature"
//         defaultValue={30}
//         getAriaValueText={valuetext}
//         valueLabelDisplay="auto"
//         shiftStep={30}
//         step={10}
//         marks
//         min={50}
//         max={100}
//       />
//     </Box>
//       );
// }

// export default InputSlider


import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const InputSlider = () => {

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom Slider"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={50}
        max={100}
        sx={{
          color: '#e74860',
          '& .MuiSlider-thumb': {
            backgroundColor: '#e74860',
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#243c76',
            color: 'white',              
          }
        }}
      />
    </Box>
  );
}

export default InputSlider;
