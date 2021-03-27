import React from 'react'
import { TableComponent } from './Tablecomponent/Table.component'
import { processColumnsLayout } from '../functions/processColumsLayout';
import { foundMatches } from '../functions/getDataWithMathces';

export const TableWrapper = ({ parsingResult }) => {

     const columns = processColumnsLayout(parsingResult.meta.fields);

     const dataSource = parsingResult.data.map((item, index) => {
         const lowerCaseObj = {
             id: index + 1,
             key: index + 1
         };

         Object.keys(item).forEach(key => {
             lowerCaseObj[key.toLowerCase().trim()] = item[key].trim();
         })

         return lowerCaseObj;
     })

     const dataSourceWithMathces = foundMatches(dataSource);

     console.log("dataSourceWithMathces", dataSourceWithMathces);

    return (
        <TableComponent columns={columns} dataSource={dataSourceWithMathces}/>
        // <div>Table wrapper component</div>
    )
}