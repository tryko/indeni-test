import React, { memo, useEffect,useState }  from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash'
import { selectors } from './../../store/reducer';
import { defaultPerson } from './../../store/mock';
import { Button } from '@material-ui/core';
import { updatePerson } from './../../store/actions'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    editContainer:{
        maxWidth:300,
    },
    formContainer:{
        display:'flex',
        flexDirection:'column'
    },
    image:{
      width: 500,
      height: 500,
      objectFit: "contain",
    },
  });

const Edit = (props) => {
    const { updatePerson } = props;
    const { picture, name, birthDate, email, address, id } = props.personToEdit ? props.personToEdit : defaultPerson;
    const inputStyle = {style: {
        padding: 7
      }}
    const [values, setValues] = useState({
        name: {
            first: name.first ,
            last:name.last
        },
        email: email,
        id: id,
        birthDate,
        address: {
            state: address.state,
            city: address.city,
            street: address.street
        },
        picture:{
            large: picture.large
        }
      });

    useEffect(() => {
        if(!props.personToEdit) props.history.replace('/');
    },[])
    
    const handleChange = name => event => {
        const newObj = _.set(values,name ,event.target.value)
        setValues({...newObj});
        
      };

    const handleCancle = () => {
        props.history.replace('/');
    }
    
    const handleSubmit= () =>{
        // fire an action
        props.history.replace('/');
        updatePerson(values);
    }
    
    const classes = useStyles(props);
    
    return (
        <main className={classes.editContainer}>   
            EDIT PAGE
            <div className={classes.imageContainer}>
                <img align="middle" src={picture.large} className={classes.image}/>
            </div>
            <form className={classes.formContainer} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="First Name"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.name.first}
                    onChange={handleChange('name.first')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Last Name"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.name.last}
                    onChange={handleChange('name.last')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Birth Date"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.birthDate}
                    onChange={handleChange('birthDate')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="state"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.address.state}
                    onChange={handleChange('address.state')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="state"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.address.city}
                    onChange={handleChange('address.city')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="state"
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={values.address.street}
                    onChange={handleChange('address.street')}
                    margin="normal"
                    variant="outlined"
                />
            </form>
            <Button onClick={ handleSubmit }> Submit</Button>
            <Button onClick={ handleCancle }> Cancel</Button>
        </main>
);}

const mapStateToProps = (state) => ({
    personToEdit: selectors.getPersonToEdit(state),
})

const mapDispatchToProps = {
    updatePerson:updatePerson
}

const useConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    memo,
    useConnect
)(Edit)

export { Edit }
