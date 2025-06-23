package com.example.learnovate.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms", uniqueConstraints = {
        @UniqueConstraint(
                name = "unique_user_pair",
                columnNames = {"sender_id", "receiver_id"}
        )
})
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonManagedReference
    private RegisteredUser user1;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @JsonManagedReference
    private RegisteredUser user2;

    public void setUsersOrdered(RegisteredUser u1, RegisteredUser u2) {
        if (u1.getUserId() < u2.getUserId()) {
            this.user1 = u1;
            this.user2 = u2;
        } else {
            this.user1 = u2;
            this.user2 = u1;
        }
    }
}
