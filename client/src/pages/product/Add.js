import React, { useState, useRef } from 'react';
import 'antd/dist/antd.css';
import style from './Add.module.css';
import { categories } from '../../helpers/constants'
import {
    Form,
    Input,
    Button,
    Divider,
    InputNumber,
    TreeSelect,
    Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { SuccessNotification } from '../../helpers/Notifications';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    let navigate = useNavigate();
    const fileref = useRef()

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            console.log('e array')
            return e;
        }
        console.log('e array degil')
        return e && e.fileList;
    };
    const onFinish = async values => {
        console.log('Success:', values);

        console.log(fileref.current.files[0])
        const formData = new FormData();
        formData.append('file', fileref.current.files[0]);

        const options = {
            method: 'POST',
            body: formData,
        };
        fetch('http://localhost:5000/upload', options).then(res => res.json()).then(data => {
            console.log(data)
        })

        // const res = await fetch(`http://localhost:5000/product`, {
        //     method: 'POST',
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(values),
        // });
        // const response = await res.json();
        // SuccessNotification({ description: response.message });
        // // navigate("/")
        // console.log(response);

    };

    return (
        <div className={style.wrapper}>
            <h2>Add Product</h2>
            <Divider />
            <Form
                onFinish={onFinish}
                className={style.form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item name='title' label="Title">
                    <Input />
                </Form.Item>
                <Form.Item name='price' label="Price($)">
                    <InputNumber />
                </Form.Item>
                <Form.Item name='category' label="Category">
                    <TreeSelect
                        treeData={categories}
                    />
                </Form.Item>
                <Form.Item name='description' label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='image' label="Image URL">
                    <Input />
                </Form.Item>
                {/* <Form.Item
                    name="upload"
                    label="Product Images"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" multiple={true} listType="picture" onChange={(e) => console.log(e)} >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item> */}
                <input ref={fileref} type="file" onChange={(e) => console.log(e.target.files[0])} />
                <div className={style.submitButton}>
                    <Button type="primary" htmlType="submit">Add</Button>

                </div>

            </Form>
        </div>
    );
};

export default Add;