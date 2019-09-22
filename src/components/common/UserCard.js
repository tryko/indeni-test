import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Edit, AllOut, ThumbUp } from '@material-ui/icons';

const useStyles = makeStyles({
  card: {
    position:'relative',
    margin: 10,
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
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  userText:{
    textTransform: "capitalize",
  },
  iconsContainer:{
    position: "absolute",
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 1,
  },
  match:{
    color: props => props.selected ? 'red':'black' 
  },
  image:{
    maxWidth: 149,
    maxHeight: 149,
    width: '85%',
    height: '85%',
    objectFit: "contain",
  }
});

export default function SimpleCard(props) {
  const { email, name, picture } = props.userDetails
  const classes = useStyles(props);
  const { handleSelect } = props
  const handleOnClick = () => handleSelect(props.userDetails)

  return (
    <Card className={classes.card}>
      <CardContent>
        {name.first&& <div className={classes.iconsContainer}>
          <Edit/>
          <br/>
          <AllOut/>
          <br/>
          <ThumbUp className={ classes.match } onClick={ handleOnClick }/>
        </div>}
        <div className={classes.imageContainer}>
          <img align="middle" src={picture.large} className={classes.image}/>
        </div>
        <Typography variant="body2" component="p" className={classes.userText}>
          {name.first + " " + name.last}
        </Typography>
        <Typography variant="body2" component="p">
          { email }
        </Typography>
      </CardContent>
    </Card>
  );
}
