import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const CfbTable = (props) => {
    const { cols, rows, handleClick } = props;
    let { size } = props;

    if (!size) {
        size = "sm";
    }

    const [state, setState] = useState({
        cols,
        rows,
        data:[],
        limit: 25,
        activePage: 1,
    })

    const handlePageChange = (pageNumber) => {
        setState((prev) => ({ ...prev, activePage: pageNumber }));

        // axios
        //     .get(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}`)
        //     .then((res) => {
        //         setState((prev) => ({
        //             ...prev,
        //             data: res.data
        //         }));
        //     })
        //     .catch((error) => console.log(error));
    };

    return (<Row>

        <Col xs={12}>
            <Table striped bordered hover variant="dark" size={size} className={"text-center"}>
                <thead>
                    <tr>
                        {cols.map(col => <th>{col.text.toUpperCase()}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => <tr id={row.id} onClick={(e) => handleClick(row.id, e)} key={row.id}>
                        {row.content.map((val) => <td>
                            {!isURL(val) ? val : isImage(val) ? <img src={val} className="table-image" alt={row.id} /> : <a href={val} />}
                        </td>)}
                    </tr>)}

                </tbody>
            </Table>
        </Col>
        <Col xs={12}>
            <Pagination className="px-4">
                {state.rows.map((_, index) => {
                    return (
                        <Pagination.Item
                            onClick={() => handlePageChange(index + 1)}
                            key={index + 1}
                            active={index + 1 === state.activePage}
                        >
                            {index + 1}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
        </Col>
    </Row>
    );
}

export default CfbTable;