import React, { memo }  from 'react';
import { compose  } from 'redux';
import { connect } from 'react-redux';
import UserCard from '../common/UserCard'
import { selectors } from '../../store/reducer';
import './home.css';

const Home = ({  
users
}) => {
    return (
    <main className="home"> 
        {users.map( (user,i) => <UserCard 
          key={"user-" + i}

          userDetails={user}
        />)}  
        
    </main>
);}

const mapStateToProps = state => ({
    users: selectors.getUsers(state)
  });

const mapDispatchToProps = {

}

export default compose(
    memo,
    connect(mapStateToProps,mapDispatchToProps)
)(Home);

export { Home }
