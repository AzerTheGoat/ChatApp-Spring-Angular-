package fr.mightycode.cpoo.server.service;

import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import fr.mightycode.cpoo.server.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

  @Value("${cpoo.server.domain}")
  private String serverDomain;

  private final MessageRepository messageRepository;
  private final ConversationRepository conversationRepository;
  private final CustomUserRepository customUserRepository;

  /**
   * Store a message in the DB.
   *
   * @param message The message to store
   */
  public void storeMessage(Message message) {
    messageRepository.save(message);
  }

  /**
   * Get all messages send to or by a given user.
   *
   * @param login The user login
   * @return the list of messages sent to or by the user
   */
  public List<Message> getMessages(String login) {
    String userAddress = login + "@" + serverDomain;
    return messageRepository.findByFromOrToIgnoreCaseOrderByTimestampDesc(userAddress, userAddress);
  }

  public List<Message> getAllMessageOfConversation(String loginOtherUser) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails) {
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) == null && conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) == null) {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) != null) {
      conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).setSeen(true);
      conversationRepository.save(conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser));
      return conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).getMessages();
    } else if (conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) != null) {
      conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).setSeen(true);
      conversationRepository.save(conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser));
      return conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).getMessages();
    }
    return null;
  }

  public Message getLastMessageOfConversation(String loginOtherUser) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails) {
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) == null && conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) == null) {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) != null) {
      List<Message> messages = conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).getMessages();
      return messages.get(messages.size()-1);
    } else if (conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) != null) {
      List<Message> messages = conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).getMessages();
      return messages.get(messages.size()-1);
    }
    return null;
  }

}
