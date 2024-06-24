import { Card, Table } from "antd";
import { useState, useEffect } from 'react';
import { getDataForNationalDataGrid } from "../../lib/service";

const NationalDataTable = () => {

    const [dataSource, setDataSource] = useState();
    const [col, setCol] = useState();
    // console.log(col);

    const getData = async () => {
        const res = await getDataForNationalDataGrid();

        let data = res.map((item, index) => {
            return { key: index, ...item };
        });

        let columns = []
        Object.keys(res[0]).map((key) => {
            let column = {
                title: key,
                dataIndex: key,
                key: key.toLowerCase()
            }

            columns.push(column);
        })

        setDataSource(data);
        setCol(columns);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Card>
                <div>
                    <Table columns={col} dataSource={dataSource} size="middle" scroll={{
                        x: 1500,
                        y: 300,
                    }} pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: [5, 10, 15]
                    }} />
                </div>
            </Card>

        </>
    );
}

export default NationalDataTable;