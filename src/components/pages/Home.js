import React, { memo,useState }  from 'react';
import { compose  } from 'redux';
import { connect } from 'react-redux';
import UserCard from '../common/UserCard'
import { selectors } from '../../store/reducer';
import './home.css';

const Home = ({  
users
}) => {
    const [ firstPerson, setFirstPerson ] = useState();
    const [ secondPerson, setSecondPerson ] = useState();
    const addMatch = (user) => { 
      console.log(user) 
      if (!firstPerson) setFirstPerson(user)
      else if(!secondPerson) setSecondPerson(user)
    }
    return (
    <main > 
       <div>
          { !!firstPerson && firstPerson.name.first}
        </div>
        <div className="home">
          {users.map( (user,i) => <UserCard 
            key={"user-" + i}
            selected={true}
            addMatch={addMatch}
            userDetails={user}
          />)}  
        </div>
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
