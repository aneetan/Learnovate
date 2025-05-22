package com.example.learnovate.model;

import jakarta.persistence.*;

import java.util.Map;

@Entity
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mentorId;

    @ElementCollection
    private Map<String, String> additonalInfo;

    @ElementCollection
    private Map<String, String> professionalInfo;

    @ElementCollection
    private Map<String, String> documentUpload;

    private String status;

    public Mentor() {
    }

    public int getMentorId() {
        return mentorId;
    }

    public void setMentorId(int mentorId) {
        this.mentorId = mentorId;
    }

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
