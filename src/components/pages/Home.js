import React, { memo, useEffect, useState }  from 'react';
import { compose  } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { selectors } from '../../store/reducer';
import MatchComp from './../common/MatchComp';
import PersonsList from './../common/PersonsList';
import Modal from '@material-ui/core/Modal';
import UserCard from '../common/UserCard'
import { 
  addToMatch, 
  editPerson,
  fetchPersonsAction ,
  fetchSinglePersonAction , 
  removeFromMatch 
} from './../../store/actions';

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
  editPerson,
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
      if(!personsFetchStatus || !personsFetchStatus === 1) fetchPersonsAction();
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
    
    return (
      <main > 
          <MatchComp 
            personsInMatch={ personsInMatch } 
            removeFromMatch= { removeFromMatch }
            onShowPersonDetails={onShowPersonDetails} 
          />
          <div className="button-wrapper">
            <Link to="/edit">
              <Button> New </Button>
            </Link>
            <Button onClick={ reFetch }> Random </Button>
          </div>
          <PersonsList 
            personsFetchStatus={personsFetchStatus} 
            persons={persons} 
            addToMatch={addToMatch}
            editPerson={editPerson}
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
  editPerson: editPerson,
  fetchPersonsAction: fetchPersonsAction,
  fetchSinglePersonAction:fetchSinglePersonAction,
  removeFromMatch: removeFromMatch
}

export default compose(
    memo,
    connect(mapStateToProps,mapDispatchToProps)
)(Home);

export { Home }
