import React, { memo,useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import { removeFromMatch } from './../../store/actions'

const useStyles = makeStyles({
    matchWrapper:{
        width: "100%",
        border: "1px solid black",
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    personContainer:{
      border:"1px solid black",
      marginRight: 10,
      marginLeft: 10,
    },
    matchDetails:{
        width: 100,
        height: 100
    },
    imageContainer:{
        width: 149,
        height: 149,
    }
  });

const MatchComp = (props) => {
    const classes = useStyles(props);
    const { personsInMatch, removeFromMatch, } = props
    console.log(personsInMatch)

    return (
    <div className={classes.matchWrapper}>
        {personsInMatch.map( (user,i) => <UserCard             
            key={"selectedPerson-" + i}
            selected={true}
            handleSelect={removeFromMatch}
            userDetails={user}/>)}
        
        <div className={classes.matchDetails}></div>
    </div>
);}

export default memo(MatchComp);

export { MatchComp }
