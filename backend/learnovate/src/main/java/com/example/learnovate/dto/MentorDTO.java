package com.example.learnovate.dto;

import java.util.Map;

public class MentorDTO {
    private Map<String, String> additonalInfo;
    private Map<String, String> professionalInfo;
    private Map<String, String> documentUpload;
    private String status;

    public Map<String, String> getAdditonalInfo() {
        return additonalInfo;
    }

    public void setAdditonalInfo(Map<String, String> additonalInfo) {
        this.additonalInfo = additonalInfo;
    }

    public Map<String, String> getProfessionalInfo() {
        return professionalInfo;
    }

    public void setProfessionalInfo(Map<String, String> professionalInfo) {
        this.professionalInfo = professionalInfo;
    }

    public Map<String, String> getDocumentUpload() {
        return documentUpload;
    }

    public void setDocumentUpload(Map<String, String> documentUpload) {
        this.documentUpload = documentUpload;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
