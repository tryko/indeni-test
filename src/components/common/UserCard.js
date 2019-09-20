import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Edit, AllOut } from '@material-ui/icons';
const useStyles = makeStyles({
  card: {
    position:'relative',
    minWidth: 275,
    maxWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  imageContainer:{
    margin: 'auto 25%',
  },
  userText:{
    textTransform: "capitalize",
  },
  iconsContainer:{
    position: "absolute",
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 20,
  }
});

export default function SimpleCard({ userDetails }) {
  const classes = useStyles();
  const { email, name, picture } = userDetails
  return (
    <Card className={classes.card}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be
          {bull}
          nev
          {bull}o{bull}
          lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <div className={classes.iconsContainer}>
          <Edit/>
          <AllOut/>
        </div>
        <div className={classes.imageContainer}>
          <img align="middle" src={picture.large}/>
        </div>
        <Typography variant="body2" component="p" className={classes.userText}>
          {name.first + " " + name.last}
        </Typography>
        <Typography variant="body2" component="p">
          { email }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
