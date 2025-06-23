package com.example.learnovate.repository;

import com.example.learnovate.model.Message;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByRoomOrderByTimestampAsc(Room room);
    List<Message> findByRoomOrderByTimestampDesc(Room room);
}
