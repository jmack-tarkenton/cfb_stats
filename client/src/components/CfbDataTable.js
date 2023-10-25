import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

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

export default function CfbDataTable(props) {
    let {cols, rows, handleClick, size} = props;

    rows = rows.map(row => {
        for (let [key, val] of Object.entries(row)) {
            if (isURL(val)) {
                if (isImage(val)) {
                    row[key] = <img src={val} alt={row.id} className={"table-image"}/>
                } else {
                    row[key] = <a href={val}/>
                }
            }
        }

        return row;
    })

    if (!size) {
        size = "sm";
    }

    return (<BootstrapTable
            striped bordered hover variant="light" size={size}
            classes={"table-sm table-striped table-light text-center top-25"}

            keyField="id"
            data={rows}
            columns={cols}
            pagination={paginationFactory({
                sizePerPage: 25,
                classes: "pagination",
                totalSize: rows.length,
                showTotal: true
            })}
            rowEvents={{onClick: handleClick}}
        />

    );
}
