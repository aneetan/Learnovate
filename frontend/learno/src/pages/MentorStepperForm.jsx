import { FileOutlined, GroupOutlined, LoginOutlined, ProfileOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router'
import AdditionalInfo from '../components/Mentor/AdditionalInfo'
import ProfessionalInfo from '../components/Mentor/ProfessionalInfo'
import DocumentUpload from '../components/Mentor/DocumentUpload'

const MentorStepperForm = () => {
    // const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)
    const [additonalInfo, setAdditionalInfo] = useState(null)
    const [professionalInfo, setProfessionalInfo] = useState(null)
    const [documentUpload, setDocumentUpload] = useState(null)

    const submitAdditionalInfo= (values) => {
        setAdditionalInfo(values)
        setCurrentStep(1)
    }

    const submitProfessionalInfo= (values) => {
        setProfessionalInfo(values)
        setCurrentStep(2)
    }

    const data ={
        additonalInfo,
        professionalInfo
    }

    const submitDocuments= () => {
        const formValue = {
            ...data,
            status: "pending"
        }
        console.log(formValue)
    }

    const forms = [
        <AdditionalInfo onFinish={submitAdditionalInfo} initialValues={additonalInfo}/>,
        <ProfessionalInfo onFinish={submitProfessionalInfo} initialValues={professionalInfo}/>,
        <DocumentUpload onFinish={submitDocuments} initialValues={documentUpload}/>
    ]

    const isStepDisabled = (step) => {
        if(step === 0){
            return
        }

        if(step === 1){
            return additonalInfo === null
        }

        if(step === 2){
            return additonalInfo === null || professionalInfo === null
        }

    }

    return (
        <>
            <div className="min-h-screen py-12 w-[100%] bg-[#FEF0C9]">
                <div className="container">
                    <div className="lg:flex-row p-4 w-8/12 lg:w-8/12 bg-white items-center rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div className='p-6'>
                            <Steps onChange={setCurrentStep} current={currentStep}>
                                <Steps.Step title='Personal Details' icon={<ProfileOutlined />} disabled={isStepDisabled(0)} />
                                <Steps.Step title='Professional Info' icon={<GroupOutlined/>} disabled={isStepDisabled(1)} />
                                <Steps.Step title='Documents' icon={<FileOutlined/>} disabled={isStepDisabled(2)} />
                            </Steps>
                        </div>
                        <div className='w-[100%]'>
                            {forms[currentStep]}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default MentorStepperForm