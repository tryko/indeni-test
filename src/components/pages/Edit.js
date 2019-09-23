import React, { memo, useEffect }  from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { selectors } from './../../store/reducer';
import {  } from './../../store/actions'

const useStyles = makeStyles({
    image:{
      width: 500,
      height: 500,
      objectFit: "contain",
    }
  });

const Edit = (props) => {
    useEffect(() => {
        console.log('props: ',props)
        
        if(!props.personToEdit) props.history.replace('/');
    },[])
    
    const { picture } = props.personToEdit ? props.personToEdit : {picture:{large:''}};
    const classes = useStyles(props);
    
    return (
        <main 
            // className={  }
        >   
            <div 
                // className={}
            >
                EDIT PAGE
                <div className={classes.imageContainer}>
                    <img align="middle" src={picture.large} className={classes.image}/>
                </div>
            </div>
        </main>
);}

const mapStateToProps = (state) => ({
    personToEdit: selectors.getPersonToEdit(state),
})

const mapDispatchToProps = {
}

const useConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    memo,
    useConnect
)(Edit)

export { Edit }
