package fr.mightycode.cpoo.server.repository;

import fr.mightycode.cpoo.server.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, UUID> {
  CustomUser findByUsername(String username);
  boolean existsByUsername(String username);
  void deleteByUsername(String username);
}
