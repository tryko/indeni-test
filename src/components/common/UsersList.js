import React from 'react';
import UserCard from '../common/UserCard'

const UsersList = ({  
  addToMatch,
  personsFetchStatus,
  onShowPersonDetails,
  persons,
}) => {
    // this creates infinite loops, create a component to render the list and place this code there
    const renderCompByStatus = (personsFetchStatus) => {
      if( personsFetchStatus === 1){ 
        return (
            <div className="users-list">
            {persons.map( (user,i) => <UserCard 
                key={"person-" + i}
                selected={false}
                handleSelect={addToMatch}
                userDetails={ user }
                onShowPersonDetails={onShowPersonDetails}
            />)}  
            </div>)}
      if(personsFetchStatus === 2) return <div>Failed to retrive data</div>
      else { 
          return <div> Loading...</div>
        }
    }

    return (
        renderCompByStatus(personsFetchStatus)
        );
}

export default UsersList

export { UsersList }
