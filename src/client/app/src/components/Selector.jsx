import { Select } from 'antd';

const Selector = ({ option, defaultValue, handleChange }) => {

    return (
        <Select
            showSearch
            className="w-full"
            placeholder="Search to Select"
            optionFilterProp="label"
            defaultValue={defaultValue}
            onChange={handleChange}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={option}
        />
    );
}

export default Selector;