import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import propTypes from 'prop-types';
import { saveTable } from '../../../store/actions/tables';
import './TableForm.css';

function TableForm({ item, onSave }) {
    const [table, setTable] = useState(item);
    const history = useHistory();

    function onFormSubmit(e) {
        e.preventDefault();
        onSave(table);
        history.push('/tables');
    }

    function onChange({ target }) {
        setTable({
            ...table,
            [target.name]: target.value
        });
    }

    return (
        <div className="form__container">
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={table.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={table.description} onChange={onChange} />
                </div>
                <label htmlFor="salary">Seats count</label>
                <select className="form-control" name="seatsCount" value={table.seatsCount} onChange={onChange}>
                        <option>2</option>
                        <option>4</option>
                        <option>6</option>
                        <option>8</option>
                        <option>10</option>
                    </select>
                <div className="form__save__btn">
                    <button className="btn btn-secondary">Save</button>
                </div>
            </form>
        </div>
    );
}

TableForm.propTypes = {
    item: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        description: propTypes.string,
        seatsCount: propTypes.oneOfType([
            propTypes.string,
            propTypes.number
          ])
    }),
    onSave: propTypes.func
};

function mapStateToProps(state, { id }) {
    return {
        item:
            id !== 'new'
                ? state.tables.list.find(item => item.id === id)
                :
                {
                    name: '',
                    description: '',
                    seatsCount: 0
                }
    };
}

const mapDispatchToProps = {
    onSave: saveTable
};

export default connect(mapStateToProps, mapDispatchToProps)(TableForm);
