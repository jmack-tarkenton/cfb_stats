import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

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
    console.log({ size });
    console.log({ cols, rows });
    return (
        <Table striped bordered hover variant="dark" size={size}>
            <thead>
                <tr>
                    {cols.map(col => <th>{col.toUpperCase()}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => <tr id={row.id} onClick={(e)=>handleClick(row.id,e)} key={row.id}>
                    {row.content.map((val) => <td>
                        {!isURL(val) ? val : isImage(val) ? <img src={val} className="table-image" alt={row.id} /> : <a href={val} />}
                    </td>)}
                </tr>)}

            </tbody>
        </Table>
    );
}

export default CfbTable;