package fr.mightycode.cpoo.server.repository;

import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
  List<Conversation> findConversationsByUsername1OrUsername2(String username1, String username2);
  Conversation findConversationByUsername1AndUsername2(String username1, String username2);
}
