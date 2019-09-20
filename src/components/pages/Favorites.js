import React, { memo }  from 'react';
import injectSheet from 'react-jss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectors } from './../../store/reducer';
import { updateSelectedLocationAction } from './../../store/actions'
import HeaderComp from './../../components/common/HeaderComp' 
import CurrentWeatherComp from "./../forecastManger/CurrentWeatherComp";

const useJss = injectSheet((theme) => ({
    root: {
        backgroundColor: theme.colors.main,
        minHeight: '100vh',
        overflow: 'auto',
        fontFamily: 'Helvetica, Arial, sans-serif',
    },
    favoritesContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridColumnGap: '20px',
        margin: '10px 10px',
        justifyContent: 'center'
        
    },
    link:{
        textDecoration: 'none',
    }
}));
const Favorites = ({ classes, favorites, updateSelectedLocationAction }) => {
    return (
        <main 
            className={ classes.root }
        >   
            <HeaderComp/>
            <div className={classes.favoritesContainer}>
                {favorites.map((item,i) => 
                    {
                        return (
                         <Link key={i} className={classes.link} onClick={ () => updateSelectedLocationAction(item) } to="/">
                            <CurrentWeatherComp
                                selectedLocation={item}
                            />
                        </Link>)
                })}
            </div>
        </main>
);}

const mapStateToProps = (state) => ({
    favorites: selectors.getFavorites(state)
})

const mapDispatchToProps = {
    updateSelectedLocationAction
}

const useConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    memo,
    useJss,
    useConnect
)(Favorites)

export { Favorites }
