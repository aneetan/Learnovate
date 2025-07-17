package com.example.learnovate.repository;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM Room r WHERE (r.user1.userId = :user1Id AND r.user2.userId = :user2Id) OR (r.user1.userId = :user2Id AND r.user2.userId = :user1Id)")
    Optional<Room> findWithLockingByUserIds(@Param("user1Id") int user1Id, @Param("user2Id") int user2Id);

    @Query("SELECT r FROM Room r WHERE (r.user1.userId = :user1Id AND r.user2.userId = :user2Id) OR (r.user1.userId = :user2Id AND r.user2.userId = :user1Id)")
    Optional<Room> findByUserIds(@Param("user1Id") int user1Id, @Param("user2Id") int user2Id);

    @Query("SELECT r FROM Room r WHERE r.user1.userId = :userId OR r.user2.userId = :userId")
    List<Room> findByUser1UserIdOrUser2UserId(@Param("userId") int userId);

}
