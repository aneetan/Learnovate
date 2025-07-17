package com.example.learnovate.controller;

import com.example.learnovate.dto.RoomRequestDto;
import com.example.learnovate.dto.RoomResponseDto;
import com.example.learnovate.dto.UserDto;
import com.example.learnovate.model.Message;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import com.example.learnovate.repository.RoomRepository;
import com.example.learnovate.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private ChatService chatService;

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/create/{user1Id}/{user2Id}")
    public ResponseEntity<Room> createRoom(
            @PathVariable Integer user1Id,
            @PathVariable Integer user2Id) {
        Room room = chatService.getOrCreateRoom(user1Id, user2Id);
        return ResponseEntity.ok(room);
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getRoomMessages(
            @PathVariable Integer roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    @GetMapping("/find/{user1Id}/{user2Id}")
    public ResponseEntity<?> findRoom(
            @PathVariable Integer user1Id,
            @PathVariable Integer user2Id
            ) {

        try {
            // Validate input
            if (user1Id <= 0 || user2Id <= 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "error", "Invalid user IDs",
                                "message", "User IDs must be positive integers"
                        ));
            }

            // Ensure consistent ordering in database queries
            int lowerId = Math.min(user1Id, user2Id);
            int higherId = Math.max(user1Id, user2Id);

            Optional<Room> room = roomRepository.findByUserIds(user1Id, user2Id);

            if (room.isPresent()) {
                return ResponseEntity.ok(Map.of(
                        "exists", true,
                        "room", room.get()
                ));
            }

            return ResponseEntity.ok(Map.of("exists", false));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error", "Server error",
                            "message", e.getMessage()
                    ));
        }
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
