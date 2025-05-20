import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
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
        };

        const [selectedArea, setSelectedArea] = useState("");
        const [selectedSkills, setSelectedSkills] = useState([]);

         const handleCheckboxChange = (skill) => {
            setSelectedSkills((prevSkills) =>
            prevSkills.includes(skill)
                ? prevSkills.filter((s) => s !== skill)
                : [...prevSkills, skill]
            );
        };
        return (
            <>
                <Form onFinish={onFinish} initialValues={initialValues}>

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
                               <select
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={selectedArea}
                                onChange={(e) => {
                                    setSelectedArea(e.target.value);
                                    setSelectedSkills([]); // Reset skills when area changes
                                }}
                                >
                                <option value="">Select an area</option>
                                {Object.keys(areaOptions).map((area) => (
                                    <option key={area} value={area}>
                                    {area}
                                    </option>
                                ))}
                                </select>
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
                        {selectedArea && (
                        <div className='w-full md:w-1/2 px-4 md:px-8'>
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
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {areaOptions[selectedArea].map((skill) => (
                                    <label key={skill} className="flex items-center space-x-2">
                                        <input
                                        type="checkbox"
                                        value={skill}
                                        checked={selectedSkills.includes(skill)}
                                        onChange={() => handleCheckboxChange(skill)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">{skill}</span>
                                    </label>
                                    ))}
                                </div>
                            </Form.Item>
                        </div>
                          )}
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