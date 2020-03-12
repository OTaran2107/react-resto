import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import TablesList from '../TablesList/TablesList'
import TableForm from './../TableForm/TableForm'
import Preloader from '../../common/Preloader/Preloader'
import { getTables } from '../../../store/actions/tables'

function Tables({ isLoading, getTables }) {
    const { path } = useRouteMatch();

    useEffect(() => {
        getTables();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>Tables</h2>
            {isLoading ? 
                <Preloader />
                :
                <Switch>
                    <Route exact path={`${path}/`}>
                         <TablesList />
                    </Route>
                    <Route
                        path={`${path}/:id`}
                        render={route => {
                            return <TableForm id={route.match.params.id} />;
                        }}
                    >
                    </Route>
                </Switch>
            }
        </div>
    )
}

Tables.propTypes = {
    isLoading: propTypes.bool,
    getTables: propTypes.func
};

function mapStateToProps(state) {
    return {
        isLoading: state.tables.isLoading
    }
}

const mapDispatchToProps = {
    getTables: getTables
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
