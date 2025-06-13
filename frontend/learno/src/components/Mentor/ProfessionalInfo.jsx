import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
const { Option } = Select;



const ProfessionalInfo = ({onFinish, initialValues} ) => {

    const areaOptions = {
        "Technology": [
            "Web Development",
            "Mobile App Development",
            "Quality Assurance",
            "Cybersecurity",
            "DevOps",
            "Data Science",
        ],
        "Business & Entrepreneurship": [
            "Startup Mentorship",
            "Pitching & Fundraising",
            "Sales Strategy",
            "Business Model Design",
        ],
        "Career & Professional Growth": [
            "Resume Review",
            "Interview Preparation",
        ],
        "Soft Skills & Leadership": [
            "Time Management",
            "Public Speaking",
            "Team Leadership",
            "Conflict Resolution",
        ],
        "Education & Academics": [
            "Exam Preparation",
            "Scholarship Guidance",
        ],
        "Design & UX": [
            "UI Design", 
            "UX Research", 
            "Figma", 
            "Adobe XD", 
            "Product Design",
        ],
        };

        const [selectedArea, setSelectedArea] = useState(initialValues?.area || "");
        const [selectedSkills, setSelectedSkills] = useState([]);
         const [form] = Form.useForm();

         // Sync form with initialValues when they change
        useEffect(() => {
            form.setFieldsValue(initialValues);
        }, [initialValues, form]);

         const handleAreaChange = (value) => {
            setSelectedArea(value);
            form.setFieldsValue({
            skills: [], // Reset skills when area changes
            area: value
            });
        };
        
        return (
            <>
                <Form form={form} onFinish={onFinish} initialValues={initialValues}>

                    <div className='container flex flex-wrap justify-between'>
                        <div className='w-full md:w-1/2 px-4 md:px-8'>
                            <Form.Item
                            label="Area of Expertise"
                            name="area"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                required: true,
                                message: 'Please select your area of expertise',
                                }
                            ]}
                            >
                               <Select placeholder="Select an area" onChange={handleAreaChange}>
                                    {Object.keys(areaOptions).map((area) => (
                                    <Option key={area} value={area}>{area}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className='w-full md:w-1/2 px-4 md:px-8'>
                            <Form.Item
                            name="title"
                            label="Professional title"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                required: true,
                                message: 'Enter your professional title',
                                }
                            ]}
                            >
                                <Input
                                style={{padding:"10px", outline: "none"}}
                                name='title'
                                placeholder="Eg. Software Engineer"
                                />
                            </Form.Item>

                        </div>
                    </div>

                    <div className='container flex flex-wrap justify-between'>
                        <div className='w-full md:w-1/2 px-4 md:px-8'>
                            <Form.Item
                            name="experience"
                            label="Years of Experience"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                required: true,
                                message: 'Enter your years of experience',
                                }
                            ]}
                            >
                                 <Select
                                    placeholder="---Experience in years---"
                                    allowClear
                                    >
                                        <Option value="0-1"> 0-1</Option>
                                        <Option value="2-3"> 2-3 </Option>
                                        <Option value="3-4">3-4</Option>
                                        <Option value="5+">5+</Option>
                                    </Select>
                            </Form.Item>

                        </div>
                         <div className='w-full md:w-1/2 px-4 md:px-8'>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.area !== currentValues.area}
                        >
                            {({ getFieldValue }) => {
                                const selectedArea = getFieldValue('area');
                                return selectedArea ? (
                                    <Form.Item
                                        label="Choose what you can help with"
                                        name="skills"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select skills',
                                            }
                                        ]}
                                    >
                                        <Checkbox.Group className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {areaOptions[selectedArea]?.map((skill) => (
                                                <Checkbox key={skill} value={skill}>
                                                    {skill}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                ) : null;
                            }}
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

        export default ProfessionalInfo