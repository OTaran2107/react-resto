import React from 'react'
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router';
import { createSelector } from 'reselect';
import propTypes from 'prop-types';
import { removeTable, searchTable } from '../../../store/actions/tables';
import TablesListItem from '../TablesListItem/TablesListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablesList.css';

function TablesList({ list, deleteItem, search, searchTable }) {
    const { url } = useRouteMatch();
    const history = useHistory();

    function onAddBtnClick() {
        history.push(`${url}/new`);
    }

    return (
        <div className="list__container">
            <div className="list__content">
                <div className="list__content__header">
                    <div className="list__search">
                        <img className="form__icon" src="https://findicons.com/files/icons/2813/flat_jewels/128/search.png" alt="" />
                        <input
                            type="text"
                            placeholder="name or description"
                            value={search}
                            onChange={({ target }) => searchTable(target.value)}
                        />
                    </div>
                    <div className="list__add__btn">
                        <button className="btn btn-secondary" onClick={onAddBtnClick}>Add table</button>
                    </div>
                </div>
                <div className="list__content__body">
                    <table className="table table-borderless table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Seats count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(item =>
                                <TablesListItem key={item.id} table={item} onDelete={deleteItem} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}

TablesList.propTypes = {
    list: propTypes.array,
    search: propTypes.string,
    deleteItem: propTypes.func,
    searchTable: propTypes.func
};

const listSelector = state => state.tables.list;
const searchSelector = state => state.tables.search;

const getTablesFilter = createSelector(
    [listSelector, searchSelector],
    function (list, search) {
        const searchRegExp = new RegExp(search, 'gi');
        return search
            ? list.filter(item => item.name.match(searchRegExp) || item.description.match(searchRegExp))
            : list;
    }
);

function mapStateToProps(state) {
    return {
        list: getTablesFilter(state),
        search: state.tables.search
    };
}

const mapDispatchToProps = {
    deleteItem: removeTable,
    searchTable: searchTable
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
