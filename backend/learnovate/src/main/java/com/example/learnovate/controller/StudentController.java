package com.example.learnovate.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class StudentController {
    @GetMapping
    public String greet(HttpServletRequest request){
        return "welcome to learnovate" + request.getSession().getId();
    }

}
