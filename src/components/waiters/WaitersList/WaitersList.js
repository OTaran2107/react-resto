import React from 'react'
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router';
import { createSelector } from 'reselect';
import propTypes from 'prop-types';
import { fireWaiter, searchWaiter } from '../../../store/actions/waiters';
import WaiterListItem from '../WaitersListItem/WaitersListItem';
import WaitersFilters from '../WaitersFilters/WaitersFilters'
import 'bootstrap/dist/css/bootstrap.min.css';
import './WaitersList.css';

function WaitersList({ list, deleteItem, search, searchWaiter }) {
    const { url } = useRouteMatch();
    const history = useHistory();

    function onAddBtnClick() {
        history.push(`${url}/new`);
    }

    return (
        <div className="list__container">
            <div className="list__filters">
                <WaitersFilters />
            </div>
            <div className="list__content">
                <div className="list__content__header">
                    <div className="list__search">
                        <img className="form__icon" src="https://findicons.com/files/icons/2813/flat_jewels/128/search.png" alt="" />
                        <input
                            type="text"
                            placeholder="name"
                            value={search}
                            onChange={({ target }) => searchWaiter(target.value)}
                        />
                    </div>
                    <div className="list__add__btn">
                        <button className="btn btn-secondary" onClick={onAddBtnClick}>Add waiter</button>
                    </div>
                </div>
                <div className="list__content__body">
                    <table className="table table-borderless table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Date</th>
                                <th>Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(item =>
                                <WaiterListItem key={item.id} waiter={item} onDelete={deleteItem} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}

const listSelector = state => state.waiters.list;
const searchSelector = state => state.waiters.search;
const filtersSelector = state => state.waiters.filters;

const getWaitersFilter = createSelector(
    [listSelector, searchSelector, filtersSelector],
    function (list, search, filters) {
        const searchRegExp = new RegExp(search, 'gi');
        const filteredList = Object.keys(filters).length === 0 ? list.slice() : getFilteredList(list, filters);
        return search
            ? filteredList.filter(item => item.name.match(searchRegExp))
            : filteredList;
    }
);

function getFilteredList(list, filters) {
    const salaryFrom = parseInt(filters.salaryFrom) || 0;
    const salaryTo = parseInt(filters.salaryTo) || 100000;
    const experience = parseInt(filters.experience) || 0;
    return list.filter(item => (
        item.salary >= salaryFrom &&
        item.salary <= salaryTo &&
        calcExpirience(item.startDate) >= experience
    ));
}

function calcExpirience(startDate) {
    var today = new Date();
    var start = new Date(startDate);
    return Math.ceil(Math.abs(start.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30));
}

WaitersList.propTypes = {
    list: propTypes.array,
    search: propTypes.string,
    filters: propTypes.object
};

function mapStateToProps(state) {
    return {
        list: getWaitersFilter(state),
        search: state.waiters.search,
        filters: state.waiters.filters,
    };
}

const mapDispatchToProps = {
    deleteItem: fireWaiter,
    searchWaiter: searchWaiter
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitersList);
