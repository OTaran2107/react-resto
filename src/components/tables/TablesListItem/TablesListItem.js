import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'
import './TablesListItem.css';

function TablesListItem({
    table: { id, name, description, seatsCount },
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
            <td>{description}</td>
            <td>{seatsCount}</td>
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

TablesListItem.propTypes = {
    table: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        description: propTypes.string,
        seatsCount: propTypes.oneOfType([
            propTypes.string,
            propTypes.number
          ])
    }),
    onDelete: propTypes.func
};

export default TablesListItem
