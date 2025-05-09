package com.example.learnovate.controller;

import org.springframework.web.bind.annotation.*;
import com.example.learnovate.repository.StudentRepository;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @RequestMapping("/demo")
    public String student(){
        return "this is student";
    }

}
