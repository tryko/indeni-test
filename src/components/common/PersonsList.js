import React from 'react';
import UserCard from './UserCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    personsList:{
        maxWidth: '1200px',
        margin: '30px auto',
        padding: '0 10px',
        width: '100%' ,
        display: 'grid',
        gridAutoRows: 'auto',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '1em',
    },
    spinnerContainer:{
        textAlign: 'center',
    }

})

const PersonsList = ({  
  addToMatch,
  editPerson,
  personsFetchStatus,
  onShowPersonDetails,
  persons,
}) => {

    const classes = useStyles();
    // the status can create an infinite loop if placed in the parent component
    const renderCompByStatus = (personsFetchStatus) => {
      if( personsFetchStatus === 1){ 
        return (
            <div className={classes.personsList}>
            {persons.map( (user,i) => <UserCard 
                key={"person-" + i}
                selected={false}
                handleSelect={addToMatch}
                userDetails={ user }
                editPerson={editPerson}
                onShowPersonDetails={onShowPersonDetails}
            />)}  
            </div>)}
      if(personsFetchStatus === 2) return <div>Failed to retrive data</div>
      else { 
          return <div className={classes.spinnerContainer}> Loading...</div>
        }
    }

    return renderCompByStatus(personsFetchStatus);
}

export default PersonsList

export { PersonsList }
