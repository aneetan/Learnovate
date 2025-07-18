package com.example.learnovate.service;

import com.example.learnovate.model.Message;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import com.example.learnovate.repository.MessageRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import com.example.learnovate.repository.RoomRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;
    private final RegisteredUserRespository userRepository;

    public ChatService(RoomRepository roomRepository, MessageRepository messageRepository, RegisteredUserRespository userRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Room getOrCreateRoom(int user1Id, int user2Id) {
        // Always check in consistent order to prevent deadlocks
        int lowerId = Math.min(user1Id, user2Id);
        int higherId = Math.max(user1Id, user2Id);

        // Check existing room with lock
        Optional<Room> existingRoom = roomRepository.findWithLockingByUserIds(lowerId, higherId);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // Proceed with creation
        RegisteredUser user1 = userRepository.findById(lowerId)
                .orElseThrow(() -> new RuntimeException("User with ID " + lowerId + " not found"));

        RegisteredUser user2 = userRepository.findById(higherId)
                .orElseThrow(() -> new RuntimeException("User with ID " + higherId + " not found"));

        Room newRoom = new Room();
        newRoom.setUsersOrdered(user1, user2);

        try {
            return roomRepository.save(newRoom);
        } catch (DataIntegrityViolationException e) {
            // If we hit a race condition, fetch the existing room
            return roomRepository.findByUserIds(lowerId, higherId)
                    .orElseThrow(() -> new RuntimeException("Failed to create or find room"));
        }
    }

    public List<Message> getMessages(int roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        return messageRepository.findByRoomOrderByTimestampAsc(room);
    }

    public Message saveMessage(Integer roomId, Integer senderId, Integer recipientId, String content) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        RegisteredUser sender = userRepository.findById(senderId).orElseThrow();
        RegisteredUser receiver = userRepository.findById(recipientId).orElseThrow();


        Message message = new Message();
        message.setRoom(room);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

    public List<Room> getUserRooms(int userId) {
        return roomRepository.findByUser1UserIdOrUser2UserId(userId);
    }

    public Message getLastMessage(int roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room with ID " + roomId + " not found"));
        List<Message> messages = messageRepository.findByRoomOrderByTimestampDesc(room);
        return messages.isEmpty() ? null : messages.get(0);
    }
}
