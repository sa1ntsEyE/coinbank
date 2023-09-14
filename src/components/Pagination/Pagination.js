import React from "react";
import "./pagination.css"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNum = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNum.push(i)
    }

    return (
        <div>
            <ul className="pagination" style={{
                margin: 0,
                padding: 0,
                display: "flex",
                gap: 20,
            }}>
                {pageNum.map(number => (
                    <li
                        onClick={() => paginate(number)}
                        className="page-item"
                        key={number}
                        style={{
                            width: 20,
                            border: "1px solid #000",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <p className="page-link">
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
