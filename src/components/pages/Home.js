import React, { memo, useEffect, useState }  from 'react';
import { compose  } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { selectors } from '../../store/reducer';
import { addToMatch, fetchPersonsAction ,fetchSinglePersonAction , removeFromMatch } from './../../store/actions';
import MatchComp from './../common/MatchComp';
import UsersList from './../common/UsersList';
import Modal from '@material-ui/core/Modal';
import UserCard from '../common/UserCard'

import './home.css';


const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '44vh',
    outline:'none',
  },
}));

const Home = ({  
  addToMatch,
  fetchPersonsAction,
  fetchSinglePersonAction,
  personsFetchStatus,
  personsInMatch,
  removeFromMatch,
  persons,
}) => {

    const [open, setOpen] = useState(false);
    const [showPersonDetails, setShowPersonDetails] = useState(persons[0]);

    useEffect(() => {
      fetchPersonsAction();
    },[]);

    const classes = useStyles();

    const onShowPersonDetails = (person) => {
      setShowPersonDetails(person);
      handleOpen();
    }

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const reFetch =  () => {
      const isSingle = true;
      fetchSinglePersonAction(isSingle);
    }

    // const addNewPerson = () =>{

    // }
    

    return (
      <main > 
          <MatchComp 
            personsInMatch={ personsInMatch } 
            removeFromMatch= { removeFromMatch }
          />
          <div className="button-wrapper">
            <Button onClick={ handleOpen }> New </Button>
            <Button onClick={ reFetch }> Random </Button>
          </div>
          <UsersList 
            personsFetchStatus={personsFetchStatus} 
            persons={persons} 
            addToMatch={addToMatch}
            onShowPersonDetails={onShowPersonDetails} 
          />

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          > 
            <div className={classes.paper}>
              <UserCard userDetails={ showPersonDetails } isInModal={true}/>
            </div>
          </Modal>
      </main>
);}

const mapStateToProps = state => ({
    persons: selectors.getUsers(state),
    personsFetchStatus: selectors.getPersonsFetchStatus(state),
    personsInMatch: selectors.getPersonsInMatch(state),
  });

const mapDispatchToProps = {
  addToMatch: addToMatch,
  fetchPersonsAction: fetchPersonsAction,
  fetchSinglePersonAction:fetchSinglePersonAction,
  removeFromMatch: removeFromMatch
}

export default compose(
    memo,
    connect(mapStateToProps,mapDispatchToProps)
)(Home);

export { Home }
