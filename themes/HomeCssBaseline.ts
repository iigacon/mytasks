import { Theme, withStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: '#F5F5F5',
      color: '#101010',
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
        display: 'table-row-group',
        breakInside: 'auto',
      },
    },
  },
})

function HomeCssBaseline() {
  return null
}

export default withStyles(styles)(HomeCssBaseline)
