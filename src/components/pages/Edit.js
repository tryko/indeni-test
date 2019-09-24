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
import { getFieldName } from './../../util';

const useStyles = makeStyles({
    editContainer:{
        margin: '20px auto',
        maxWidth:300,
    },
    formContainer:{
        display:'flex',
        flexDirection:'column'
    },
    image:{
      width: 300,
      height: 300,
      objectFit: "contain",
    },
  });

const Edit = (props) => {
    const { updatePerson } = props;
    const { picture, name, birthDate, email, address, id } = props.personToEdit ? props.personToEdit : defaultPerson;

    // used in input to change some style that classes cannot change
    const inputStyle = {style: {
        padding: 10
      }}
    const classes = useStyles(props);

    // setting the person we selected
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
      
      const fieldsToUpdate = [
          'name.first','name.last','email' ,'address.state','address.city','address.street'
      ]
    
    const handleChange = name => event => {
        const newObj = _.set(values,name ,event.target.value)
        setValues({...newObj});
        
      };

    const handleCancle = () => {
        props.history.replace('/');
    }
    
    const handleSubmit= () =>{
        props.history.replace('/');
        updatePerson(values);
    }

    return (
        <main className={classes.editContainer}>   
            <div className={classes.imageContainer}>
                <img align="middle" src={picture.large} className={classes.image}/>
            </div>
            <form className={classes.formContainer} noValidate autoComplete="off">
                {fieldsToUpdate.map( (field,i) => <TextField
                    key={'field-' + i}
                    id="outlined-name"
                    label={getFieldName(field)}
                    inputProps={inputStyle}
                    className={classes.textField}
                    value={_.get(values, field)}
                    onChange={handleChange(field)}
                    margin="normal"
                    variant="outlined"
                />)}
                {values.birthDate&&<input 
                    type="date" 
                    value={values.birthDate.slice(0,10)}
                    onChange={handleChange('birthDate')}
                    name="birthDate"
                />}
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
