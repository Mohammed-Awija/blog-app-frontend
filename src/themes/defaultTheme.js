
export const style = {
    textColor: '#e4e6eb',
    darkBgColor: '#18191a',
    bgcolor: '#303133',
    main: '#FF5700',
}

export const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#b0b3b8",
      // Class for the border around the input field
      "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
      },
    }, 
    "& .MuiInputLabel-outlined": {
      color: "#b0b3b8",
    },
    backgroundColor: "#3a3b3c",
    width: '100%', height: 'auto',
    borderRadius: '5px', border: 'none',
    marginRight: '10px',
    
  }

export const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
        // Class for the border around the input field
        "& .MuiOutlinedInput-notchedOutline": {
          border: 'none'
        },
      }, 
      "& .MuiInputLabel-outlined": {
        color: "#b0b3b8",
      },
      backgroundColor: "#3a3b3c",
      width: '320px', height: '50px',
      borderRadius: '25px', border: 'none',
      marginRight: '5px',
    
    
  }

export const menu = {
  "& .MuiPaper-root": {
    backgroundColor: style.bgcolor,
    color: style.textColor
  },
}