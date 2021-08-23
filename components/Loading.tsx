import {CircularProgress, Container, Grid} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

interface Props {
  absoluted?: boolean
}

const Loading = (props: Props): JSX.Element => {
  const {absoluted} = props;
  const classes = useStyles()
  return (
    <Container className={clsx(absoluted && classes.root)}>
      <Grid container justify={'center'} alignContent={'center'}>
        <Grid item>
          <CircularProgress size={100}/>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Loading