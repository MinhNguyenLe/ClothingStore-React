import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const preventDefault = (event) => {
  event.preventDefault();
};

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = () => {
  const classes = useStyles();
  const account = JSON.parse(localStorage.getItem('Account'));
  const bought = JSON.parse(localStorage.getItem('bought'));

  const sum = bought.reduce(
    (previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue.total),
    0
  );

  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        ${sum}.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {new Date().toLocaleDateString("en-US")}
      </Typography>
      <div>
        <Link color="primary" href="/#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
};

export default Deposits;
