import React from 'react'
import { Table } from 'antd';
import './table.css';

export const TableComponent = ({ dataSource, columns }) => {

    return (
        <Table 
            columns={columns}
            dataSource={dataSource}
            pagination={false} 
            sticky={true}
            scroll={{ y: '75vh' }}
        />
    )
}