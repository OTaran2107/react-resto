import React from 'react';
import { connect } from 'react-redux';
import { setWaitersFilter } from '../../../store/actions/waiters';
import './WaitersFilters.css';

function WaitersFilters({ filters, setWaitersFilter }) {

    function onFilterChange({target}) {
        setWaitersFilter({
            ...filters,
            [target.name]: target.value
        });
    }

    return (
        <div>
            <div className="filter">
                <label>Salary, UAH</label>
                <div className="filter__item">
                    <div className="filter__item__title">
                        <label htmlFor="salaryFrom">from</label>
                    </div>
                    <select className="form-control-sm" name="salaryFrom" value={filters.salaryFrom} onChange={onFilterChange}>
                        <option></option>
                        <option>2000</option>
                        <option>3000</option>
                        <option>5000</option>
                    </select>
                </div>
                <div className="filter__item">
                    <div className="filter__item__title">
                        <label htmlFor="salaryTo">to</label>
                    </div>
                    <select className="form-control-sm" name="salaryTo" value={filters.salaryTo} onChange={onFilterChange}>
                        <option></option>
                        <option>6000</option>
                        <option>8000</option>
                        <option>10000</option>
                        <option>15000</option>
                    </select>
                </div>
            </div>
            <div className="filter">
                <label>Experience more than ...</label>
                <div className="filter__item">
                    <div className="filter__checkbox">
                        <input type="radio" className="form-check-input" name="experience" value="0" onChange={onFilterChange}/>
                        <div className="filter__checkbox__title"><label>no matter</label></div>
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__checkbox">
                        <input type="radio" className="form-check-input" name="experience" value="6" onChange={onFilterChange}/>
                        <div className="filter__checkbox__title"><label>6 month</label></div>
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__checkbox">
                        <input type="radio" className="form-check-input" name="experience" value="12" onChange={onFilterChange} />
                        <div className="filter__checkbox__title"><label>1 year</label></div>
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__checkbox">
                        <input type="radio" className="form-check-input" name="experience" value="24" onChange={onFilterChange} />
                        <div className="filter__checkbox__title"><label>2 years</label></div>
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__checkbox">
                        <input type="radio" className="form-check-input" name="experience" value="36" onChange={onFilterChange} />
                        <div className="filter__checkbox__title"><label>3 years</label></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        filters: state.waiters.filters
    };
}

const mapDispatchToProps = {
    setWaitersFilter: setWaitersFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitersFilters);

