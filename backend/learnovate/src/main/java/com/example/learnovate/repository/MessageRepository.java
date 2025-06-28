package com.example.learnovate.repository;

import com.example.learnovate.model.Message;
import com.example.learnovate.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByRoomOrderByTimestampAsc(Room room);
    List<Message> findByRoomOrderByTimestampDesc(Room room);
}
