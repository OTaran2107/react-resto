import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import DateUtils from '../../../utils/DateUtils';
import 'bootstrap/dist/css/bootstrap.min.css'
import './WaitersListItem.css';

function WaitersListItem({
    waiter: { id, name, startDate, salary },
    onDelete
}) {

    const [isDeleting, setIsDeleting] = useState(false);

    const { url } = useRouteMatch();
    const history = useHistory();

    function onItemClick() {
        history.push(`${url}/${id}`);
    }

    function onDeleteClick(e) {
        e.stopPropagation();
        setIsDeleting(true);
        onDelete(id);
    }

    return (
        <tr onClick={onItemClick}>
            <td>{name}</td>
            <td>{DateUtils.toDateFormat(startDate, 'DD.MM.YYYY')}</td>
            <td>{salary}</td>
            <td className="item__delete__btn">
                {isDeleting
                    ?
                    <button className="btn-secondary btn-sm" type="button" disabled>
                        <span className="spinner-border spinner-border-sm"></span>
                    </button>
                    :
                    <button className="btn-secondary btn-sm" onClick={onDeleteClick}>
                        Delete
                    </button>
                }

            </td>
        </tr>
    )
}

WaitersListItem.propTypes = {
    waiter: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        startDate: propTypes.string,
        salary: propTypes.oneOfType([
            propTypes.string,
            propTypes.number
          ])
    }),
    onDelete: propTypes.func
};

export default WaitersListItem;