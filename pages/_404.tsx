import { makeStyles, createStyles, Grid } from '@material-ui/core'
import { NextPage } from 'next'

const useStyles = makeStyles(() => createStyles({
  root: {
    flexGrow: 1,
    background: 'url("/images/error/bg1.jpg");',
    height: '100%',
  },
  title: {
    fontSize: 50,
    marginLeft: 60,
    marginTop: '9rem',
    fontWeight: 700,
    color: '#595d6e',
  },
  desc: {},
}))

const Error404: NextPage = () => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.root} direction={'column'}>
        <Grid item xs={12}>
          <h1 className={classes.title}>404</h1>
        </Grid>
        <Grid item>
          <p className={classes.title}>Xin lỗi, trang bạn đang tìm kiếm không
            tồn tại!</p>
        </Grid>
      </Grid>
    </>
  )
}

export default Error404
