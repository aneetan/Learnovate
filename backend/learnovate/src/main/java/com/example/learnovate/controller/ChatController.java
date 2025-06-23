package com.example.learnovate.controller;

import com.example.learnovate.dto.ChatMessageDto;
import com.example.learnovate.model.Message;
import com.example.learnovate.repository.MessageRepository;
import com.example.learnovate.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;

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
