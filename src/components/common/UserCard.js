import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
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
    height:30,
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
    maxWidth: (props) => props.isInModal ? 300: 149,
    maxHeight: (props) => props.isInModal ? 300: 149,
    width: '85%',
    height: '85%',
    objectFit: "contain",
  }
});

export default function SimpleCard(props) {
  const { email, name, picture, address, birthDate } = props.userDetails
  const classes = useStyles(props);
  const { handleSelect,editPerson, onShowPersonDetails, isInModal, inMatch } = props
  
  const handleShowPersonDetails = () => onShowPersonDetails(props.userDetails);
  const handleAddToMatch = () => handleSelect(props.userDetails);
  const handleEditPerson = () => editPerson(props.userDetails);

  return (
    <Card className={classes.card}>
      <CardContent>
        { !isInModal&&name.first&& <div className={classes.iconsContainer}>
          {!inMatch&&<Link to="/edit">
            <Edit onClick={handleEditPerson}/>
          </Link>}
          <br/>
          <AllOut onClick={handleShowPersonDetails}/>
          <br/>
          <ThumbUp className={ classes.match } onClick={ handleAddToMatch }/>
          <br/>
          <div >0.0</div>
        </div>}
        <div className={classes.imageContainer}>
          <img align="middle" src={picture.large} className={classes.image}/>
        </div>

        <Typography variant="body2" component="p" className={classes.userText}>
          {isInModal&& <b> Full Name: </b>} {name.first + " " + name.last}
        </Typography>
        
        {isInModal&&<Typography variant="body2" component="p" className={classes.userText}>
          <b> Birth Date: </b> { birthDate.slice(0,10) }
        </Typography>}

        <Typography variant="body2" component="p" className={classes.userText}>
          {isInModal&& <b> Email: </b>}{ email }
        </Typography>

          {isInModal&& <Typography variant="body2" component="p" className={classes.userText}>
          <b> Address: </b>{ `${address.city} ${address.state} ${address.street}` }
        </Typography>}
        
      </CardContent>
    </Card>
  );
}
