package com.example.learnovate.controller;

import com.example.learnovate.dto.ChatMessageDto;
import com.example.learnovate.model.Message;
import com.example.learnovate.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessageDto chatMessageDto) {
        Message message = chatService.saveMessage(
                chatMessageDto.getRoomId(),
                chatMessageDto.getSenderId(),
                chatMessageDto.getRecipientId(),
                chatMessageDto.getContent()
        );

        // Send to both users in the room
        messagingTemplate.convertAndSend(
                "/topic/room/" + chatMessageDto.getRoomId(),
                message
        );
    }
}
