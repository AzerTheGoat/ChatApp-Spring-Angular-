package fr.mightycode.cpoo.server.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;


@Data
@Entity
@Table(name = "custom_user")
public class CustomUser{

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @Column(name = "username", nullable = false, unique = true)
  private String username;
  @Column(name = "password", nullable = false, unique = true)
  private String password;
  @Column(name = "photo")
  private String pictureBase64;
  @OneToMany
  @Column(name = "conversations")
  private List<Conversation> conversations;

}
