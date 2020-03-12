import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import WaitersList from '../WaitersList/WaitersList'
import WaiterForm from './../WaiterForm/WaiterForm'
import Preloader from '../../common/Preloader/Preloader'
import { getWaiters } from '../../../store/actions/waiters'
import './Waiters.css';

function Waiters({ isLoading, getWaiters }) {
    const { path } = useRouteMatch();

    useEffect(() => {
        getWaiters();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>Waiters</h2>
            {isLoading ? 
                <Preloader />
                :
                <Switch>
                    <Route exact path={`${path}/`}>
                        <WaitersList />
                    </Route>
                    <Route
                        path={`${path}/:id`}
                        render={route => {
                            return <WaiterForm id={route.match.params.id} />;
                        }}
                    >
                    </Route>
                </Switch>
            }
        </div>
    )
}

Waiters.propTypes = {
    getWaiters: propTypes.func,
    isLoading: propTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoading: state.waiters.isLoading
    }
}

const mapDispatchToProps = {
    getWaiters: getWaiters
}

export default connect(mapStateToProps, mapDispatchToProps)(Waiters)
