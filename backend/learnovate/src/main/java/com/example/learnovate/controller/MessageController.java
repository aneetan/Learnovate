package com.example.learnovate.controller;

import com.example.learnovate.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/sendMessage") //Maps incoming messages sent to /app/sendMessage (due to the /app prefix in WebSocketConfig
    @SendTo("/topic/messages") //Sends the message to all clients subscribed to /topic/messages.

    // Broadcasts the message to all subscribers
    public Message sendMessage(Message message){
        return message;
    }
}
