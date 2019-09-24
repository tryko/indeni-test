import React, { memo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserCard from "./UserCard";

const useStyles = makeStyles({
  container: {
    borderBottom: "1px solid #dcd3d3",
    marginBottom: 20
  },
  matchWrapper: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    display: "flex",
    justifyContent: "center"
  },
  personContainer: {
    border: "1px solid black",
    marginRight: 10,
    marginLeft: 10
  },
  matchDetails: {
    width: "100%",
    height: 100,
    textAlign: "center",
    fontWeight: 'bold'
  },
  imageContainer: {
    width: 149,
    height: 149
  }
});

const MatchComp = props => {
  const classes = useStyles(props);
  const { personsInMatch, removeFromMatch, onShowPersonDetails } = props;

  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    if(personsInMatch[0].id === null || personsInMatch[1].id === null) {
        setMatchScore(0);
        return 
    }
    const lettersScore = personsScoreLetter(personsInMatch[0], personsInMatch[1]);
    const ageScore = personsAgeScore(personsInMatch[0], personsInMatch[1]);
    if(ageScore === 0) return 
    setMatchScore((lettersScore/(ageScore/10)).toFixed(2))
  });

  const createPersonObj = (personAFullName) => {
    const personObj = {};
    for (let i = 0; i < personAFullName.length; i++) {
      if (personObj.hasOwnProperty(personAFullName[i])) {
        personObj[personAFullName[i]] = personObj[personAFullName[i]] + 1;
      } else {
        personObj[personAFullName[i]] = 1;
      }
    }
    return personObj;
  };
  //   const
  const personsScoreLetter = (personA, personB) => {
    // test if both users have proper id, if not don't render the calculation
    // if (personA.id === null || personB.id === null) return;
    const personAFullName = (personA.name.first + personA.name.last).toLowerCase();
    const personBFullName = (personB.name.first + personB.name.last).toLowerCase();

    const personAObj = createPersonObj(personAFullName);
    const personBObj = createPersonObj(personBFullName);
    let lettersScore = 0;
    for (let key in personBObj) {
      if (personAObj.hasOwnProperty(key))
        lettersScore = lettersScore + personAObj[key] + personBObj[key];
    }
    return lettersScore
  };

  const personsAgeScore = (personA, personB) => {
    const personADateObj = new Date(personA.birthDate);
    const personAYear = personADateObj.getFullYear();

    const personBDateObj = new Date(personB.birthDate);
    const personBYear = personBDateObj.getFullYear();
    const ageScore = Math.abs(personAYear - personBYear);
    return ageScore;
  }

  return (
    <div className={classes.container}>
      <div className={classes.matchWrapper}>
        {personsInMatch.map((user, i) => (
          <UserCard
            key={"selectedPerson-" + i}
            selected={true}
            handleSelect={removeFromMatch}
            userDetails={user}
            inMatch={true}
            onShowPersonDetails={onShowPersonDetails}
          />
        ))}
      </div>
      <div className={classes.matchDetails}>Match Score: {matchScore}</div>
    </div>
  );
};

export default memo(MatchComp);

export { MatchComp };
