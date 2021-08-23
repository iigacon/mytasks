import { createTheme, Theme as MuiTheme } from '@material-ui/core/styles'

export interface ITheme extends MuiTheme {
  overrides: {}
  sidebar: {
    width: number
    widthCollapsed: number
    background: string
    color: string
  }
  header: {
    background: string
  }
}

const baseTheme = createTheme({
  props: {
    MuiPaper: {
      elevation: 1,
    },
    MuiAppBar: {
      elevation: 1,
    },
    MuiButton: {
      // elevation: 0,
    },
    MuiMenu: {
      elevation: 1,
    },
    MuiCard: {
      elevation: 1,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 0,
        fontSize: '0.706rem',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
      containedSecondary: {
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgb(7, 130, 94)',
        },
      },
    },
    MuiButtonGroup: {
      root: {
        boxShadow: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
      },
    },
    MuiCardHeader: {
      root: {
        borderBottom: '1px solid #ebedf2',
      },
      action: {
        marginTop: 0,
        marginRight: 0,
        alignSelf: 'center',
      },
      title: {
        fontSize: '1.056rem',
        fontWeight: 500,
        color: '#595d6e',
      },
      subheader: {
        fontSize: '0.813rem',
        color: '#74788d',
      },
    },
  },
  palette: {
    primary: {
      main: '#17c191', //'#619f30',
    },
    secondary: {
      main: '#17c191', //indigo[600],
    },
  },
  typography: {
    // fontFamily: 'Poppins,Helvetica,sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
})

const theme = {
  overrides: {
    MUIDataTable: {
      paper: {
        border: '1px solid #e5e5e5',
      },
    },
    MuiTableCell: {
      footer: {
        borderBottom: 0,
      },
      head: {
        color: '#999',
      },
    },
    MUIDataTableToolbar: {
      root: {
        display: 'none',
      },
    },
    MUIDataTableHeadRow: {
      root: {
        background: '#f6f6f6',
      },
    },
    MUIDataTableHeadCell: {
      // fixedHeaderCommon: {
      //   backgroundColor: '#f6f6f6',
      // },
      sortActive: {
        fontWeight: 'bold',
      },
    },
    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: '#f6f6f6',
      },
    },
  },
  header: {
    background: '#fff',
  },
  sidebar: {
    width: 255,
    widthCollapsed: baseTheme.spacing(7),
    background: '#1e1e2d',
    color: '#a2a3b7',
  },
}
export const Theme: ITheme = {
  ...baseTheme,
  ...theme,
}
