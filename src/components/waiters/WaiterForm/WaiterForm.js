import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import propTypes from 'prop-types';
import { saveWaiter } from '../../../store/actions/waiters';
import DateUtils from '../../../utils/DateUtils';
import './WaiterForm.css';

function WaiterForm({ item, onSave }) {
    const [waiter, setWaiter] = useState(item);
    const history = useHistory();

    function onFormSubmit(e) {
        e.preventDefault();
        onSave(waiter);
        history.push('/waiters');
    }

    function onChange({ target }) {
        setWaiter({
            ...waiter,
            [target.name]: target.value
        });
    }

    return (
        <div className="form__container">
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="John Doe" value={waiter.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input type="text" className="form-control" id="salary" name="salary" value={waiter.salary} onChange={onChange} />
                </div>
                <label htmlFor="salary">Date</label>
                <input type="text" className="form-control" id="startDate" value={DateUtils.toDateFormat(waiter.startDate, 'DD.MM.YYYY')} readOnly />
                <div className="form__save__btn">
                    <button className="btn btn-secondary">Save</button>
                </div>
            </form>
        </div>
    );
}

WaiterForm.propTypes = {
    item: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        startDate: propTypes.string,
        salary: propTypes.oneOfType([
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
                ? state.waiters.list.find(item => item.id === id)
                :
                {
                    startDate: (new Date()).toJSON(),
                    name: '',
                    salary: 0
                }
    };
}

const mapDispatchToProps = {
    onSave: saveWaiter
};

export default connect(mapStateToProps, mapDispatchToProps)(WaiterForm);
