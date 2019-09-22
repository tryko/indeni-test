import React, { memo,useState }  from 'react';
import { compose  } from 'redux';
import { connect } from 'react-redux';
import UserCard from '../common/UserCard'
import MatchComp from './../common/MatchComp';
import { selectors } from '../../store/reducer';
import { addToMatch, removeFromMatch } from './../../store/actions';
import './home.css';

const Home = ({  
  addToMatch,
  personsInMatch,
  removeFromMatch,
  users,
}) => {

    return (
    <main > 
        <MatchComp 
          personsInMatch={ personsInMatch } 
          removeFromMatch= { removeFromMatch }
        />
        <div className="home">
          {users.map( (user,i) => <UserCard 
            key={"person-" + i}
            selected={false}
            handleSelect={addToMatch}
            userDetails={ user }
          />)}  
        </div>
    </main>
);}

const mapStateToProps = state => ({
    users: selectors.getUsers(state),
    personsInMatch: selectors.getPersonsInMatch(state),
  });

const mapDispatchToProps = {
  addToMatch: addToMatch,
  removeFromMatch: removeFromMatch
}

export default compose(
    memo,
    connect(mapStateToProps,mapDispatchToProps)
)(Home);

export { Home }
