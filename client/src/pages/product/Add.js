import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Add = () => {

    let navigate = useNavigate();
<<<<<<< HEAD
    const [image, setImage] = useState()
=======
    const [fileRef, setFileRef] = useState()
>>>>>>> 02cdf7724a696b974a77e962aa51e0cffe92846b

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
<<<<<<< HEAD
        const formData = new FormData();
        formData.append('file', image);
=======
        // console.log('Success:', values);

        console.log(fileRef)
        const formData = new FormData();
        formData.append('file', fileRef);
>>>>>>> 02cdf7724a696b974a77e962aa51e0cffe92846b

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
                <Form.Item
                    label="Product Images"
                // name="upload"
                // valuePropName="fileList"
                // getValueFromEvent={normFile}
                >
<<<<<<< HEAD
                    <Upload beforeUpload={() => false} name="logo" multiple={true} listType="picture"
                        onChange={(e) => {
                            setImage(e.fileList[0].originFileObj)
                        }} >
=======
                    <Upload multiple={true} beforeUpload={() => false} onChange={(e) => {
                        console.log(e.fileList[0])
                        setFileRef(e.fileList[0])
                    }} >
>>>>>>> 02cdf7724a696b974a77e962aa51e0cffe92846b
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <div className={style.submitButton}>
                    <Button type="primary" htmlType="submit">Add</Button>

                </div>

            </Form>
        </div>
    );
};

export default Add;