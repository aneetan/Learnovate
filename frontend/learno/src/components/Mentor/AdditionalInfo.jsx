import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd'
import React from 'react'


const AdditionalInfo = ({onFinish, initialValues} ) => {
  return (
    <>
        <Form onFinish={onFinish} initialValues={initialValues}>
            <div className='container flex  justify-between'>
                <div className='w-full px-4 md:px-8'>
                    <Form.Item
                    name="bio"
                    label="Bio"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                        {
                        required: true,
                        message: 'Please enter your bio',
                        }
                    ]}
                    >
                        <Input.TextArea
                        style={{resize: "none"}}
                        name='bio'
                        placeholder="A short descrption about yourself"
                        />
                    </Form.Item>
                </div>
            </div>

            <div className='container flex flex-wrap justify-between'>
                <div className='w-full md:w-1/2 px-4 md:px-8'>
                    <Form.Item
                    name="number"
                    label="Phone Number"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                        {
                        required: true,
                        message: 'Please enter contact number',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || /^\d{10}$/.test(value)) {
                                return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please enter a valid 10-digit number!'));
                            },
                        }),
                    ]}
                    >
                        <Input
                        style={{padding:"10px", outline: "none"}}
                        name='number'
                        placeholder="Enter contact number"
                        />
                    </Form.Item>

                </div>
                <div className='w-full md:w-1/2 px-4 md:px-8'>
                    <Form.Item
                    label="Session Price (Nrs.)"
                    name="price"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                        {
                        required: true,
                        message: 'Please enter session price per hour',
                        }
                    ]}
                    >
                    <Input
                    style={{padding:"10px", outline: "none", float:"left"}}
                    name="price"
                    placeholder="Enter session price per hour"
                    />
                    </Form.Item>

                </div>
            </div>

            <div className="w-full mt-6 md:w-[14%] float-right">
                <Button type="primary"
                htmlType="submit"
                className="w-full md:w-auto mr-12 hover:drop-shadow-md hover:scale-102 transition
                cursor-pointer duration-300 ease-in-out font-bold"
                >
                Next <ArrowRightOutlined/>
                </Button>
            </div>
        </Form>
      
    </>
  )
}

export default AdditionalInfo