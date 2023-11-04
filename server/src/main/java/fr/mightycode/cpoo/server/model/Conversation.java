package fr.mightycode.cpoo.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "conversation")
public class Conversation {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;        // unique id of the message

  @OneToMany
  private List<Message> messages;

  @Column(name = "username1", nullable = false)
  private String username1;

  @Column(name = "username2", nullable = false)
  private String username2;
  @Column(name = "isSeen", nullable = true)
  private boolean isSeen = false;

  public boolean equals(Conversation c){
    if(c.getUsername1().equals(this.username1) && c.getUsername2().equals(this.username2)){
      return true;
    }
    return false;
  }

  public boolean isEmpty(){
    if(this.username1.isEmpty() && this.username2.isEmpty()){
      return true;
    }
    return false;
  }

}
