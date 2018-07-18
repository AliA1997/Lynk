import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import indigo from '@material-ui/core/colors/indigo';

//Provide the style for the progress loader.
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    transform: 'scale(10)'
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  console.log('------------props', props);
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',  height: '80vh', zIndex: 3}}>
      <CircularProgress className={classes.progress} style={{ color: indigo[500] }} thickness={7} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);