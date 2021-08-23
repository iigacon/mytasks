import { Theme, withStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => ({
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      backgroundColor: '#F5F5F5',
      color: '#101010',
      height: '100%',
      '& >div': {
        height: '100%',
      },
    },
    'a': {
      color: '#EE4223',
    },
    '.breadcrumbs': {
      margin: '33px 0 13px 0',
      '& a, p': {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    '@media print': {
      thead: {
        'display': 'table-row-group',
      },
    },
  },
})

function AuthCssBaseline() {
  return null
}

export default withStyles(styles)(AuthCssBaseline)
