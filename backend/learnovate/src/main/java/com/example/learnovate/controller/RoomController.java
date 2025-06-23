package com.example.learnovate.controller;

import com.example.learnovate.dto.RoomRequestDto;
import com.example.learnovate.dto.RoomResponseDto;
import com.example.learnovate.dto.UserDto;
import com.example.learnovate.model.Message;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import com.example.learnovate.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private ChatService chatService;

    @PostMapping("/create")
    public ResponseEntity<Room> createRoom(
            @RequestBody RoomRequestDto request) {
        Room room = chatService.getOrCreateRoom(
                request.getSenderId(),
                request.getReceiverId()
        );
        return ResponseEntity.ok(room);
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getRoomMessages(
            @PathVariable Integer roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RoomResponseDto>> getUserRooms(@PathVariable Integer userId) {
        List<RoomResponseDto> rooms = chatService.getUserRooms(userId).stream()
                .map(room -> {
                    RegisteredUser partner = room.getUser1().getUserId() == userId ? room.getUser2() : room.getUser1();
                    Message lastMessage = chatService.getLastMessage(room.getRoomId());
                    return new RoomResponseDto(
                            room.getRoomId(),
                            new UserDto(partner.getUserId(), partner.getName(), partner.getRole()),
                            lastMessage != null ? lastMessage.getContent() : null,
                            lastMessage != null ? lastMessage.getTimestamp().toString() : null
                    );
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(rooms);
    }
}
