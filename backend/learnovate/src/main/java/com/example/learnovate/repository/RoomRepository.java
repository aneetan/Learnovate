package com.example.learnovate.repository;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Optional<Room> findByUser1AndUser2(RegisteredUser user1, RegisteredUser user2);
    Optional<Room> findByUser2AndUser1(RegisteredUser user2, RegisteredUser user1);

    @Query("SELECT r FROM Room r WHERE " +
            "(r.user1.userId = :userId1 AND r.user2.userId = :userId2) OR " +
            "(r.user1.userId = :userId2 AND r.user2.userId = :userId1)")
    Optional<Room> findRoomByUserIds(@Param("userId1") int userId1,
                                     @Param("userId2") int userId2);

    @Query("SELECT r FROM Room r WHERE r.user1.userId = :userId OR r.user2.userId = :userId")
    List<Room> findByUser1UserIdOrUser2UserId(@Param("userId") int userId);
    default Optional<Room> findRoomBetweenUsers(RegisteredUser user1, RegisteredUser user2) {
        return findRoomByUserIds(user1.getUserId(), user2.getUserId());
    }
}
