package fr.mightycode.cpoo.server.controller;

import fr.mightycode.cpoo.server.dto.MessageDTO;
import fr.mightycode.cpoo.server.dto.NewMessageDTO;
import fr.mightycode.cpoo.server.dto.UserProfileDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import fr.mightycode.cpoo.server.repository.MessageRepository;
import fr.mightycode.cpoo.server.service.ConversationService;
import fr.mightycode.cpoo.server.service.MessageService;
import fr.mightycode.cpoo.server.service.RouterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("message")
@RequiredArgsConstructor
public class MessageController {

  @Value("${cpoo.server.domain}")
  private String serverDomain;

  private final RouterService routerService;
  private final ConversationRepository conversationRepository;
  private final MessageRepository messageRepository;
  public final ConversationService conversationService;
  private final MessageService messageService;
  private final CustomUserRepository customUserRepository;

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<MessageDTO> messagePost(final Principal user, @RequestBody final NewMessageDTO postMessage) {

    if(customUserRepository.existsByUsername(postMessage.to()) == false){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The user you are trying to send a message to does not exist");
    }


    UUID uuid = UUID.randomUUID();
    long time = System.currentTimeMillis();
    // Build a router message from the DTO
    RouterService.Message routerMessage = new RouterService.Message(
      uuid,
      time,
      user.getName() + "@" + serverDomain,
      postMessage.to() + "@" + serverDomain,
      postMessage.type(),
      postMessage.body()
    );


    //store this message on my database
    if (conversationRepository.findConversationByUsername1AndUsername2(user.getName(), postMessage.to()) == null && conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user.getName()) == null) {
      Conversation conversationToAddToMyDatabase = new Conversation();
      conversationToAddToMyDatabase.setMessages(new ArrayList<>());
      conversationToAddToMyDatabase.setUsername1(user.getName());
      conversationToAddToMyDatabase.setUsername2(postMessage.to());
      conversationRepository.save(conversationToAddToMyDatabase);
    }

    Conversation conversation = new Conversation();

    if (conversationRepository.findConversationByUsername1AndUsername2(user.getName(), postMessage.to()) != null) {
      conversation = conversationRepository.findConversationByUsername1AndUsername2(user.getName(), postMessage.to());
      Message messagetoStore = new Message();
      messagetoStore.setTimestamp(time);
      messagetoStore.setFrom(user.getName());
      messagetoStore.setTo(postMessage.to());
      messagetoStore.setType(postMessage.type());
      messagetoStore.setBody(postMessage.body());
      // Save the message to the database
      // Assuming you have a MessageRepository, call its save method.
      messageRepository.save(messagetoStore);
      conversation.getMessages().add(messagetoStore);
    } else if (conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user.getName()) != null) {
      conversation = conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user.getName());
      Message messagetoStore = new Message();
      messagetoStore.setTimestamp(time);
      messagetoStore.setFrom(user.getName());
      messagetoStore.setTo(postMessage.to());
      messagetoStore.setType(postMessage.type());
      messagetoStore.setBody(postMessage.body());
      // Save the message to the database
      // Assuming you have a MessageRepository, call its save method.
      messageRepository.save(messagetoStore);
      conversation.getMessages().add(messagetoStore);
    }

    conversation.setSeen(false);
    conversationRepository.save(conversation);

    // Route the message
    routerService.routeMessage(routerMessage);

    // Return the message as a DTO
    return ResponseEntity.ok(new MessageDTO(routerMessage));
  }

  @PostMapping(path = "getAllMessagesOfConversation", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<Message>> getAllMessageOfConversation(@RequestBody UserProfileDTO loginOtherUser) {
    List<Message> messages = messageService.getAllMessageOfConversation(loginOtherUser.login());
    if(messages == null){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no conversation between these 2 users");
    }
    else{
      return ResponseEntity.ok(messages);
    }
  }

  @PostMapping(path = "getLastMessagesOfConversation", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Message> getLastMessageOfConversation(@RequestBody UserProfileDTO loginOtherUser) {
    Message message = messageService.getLastMessageOfConversation(loginOtherUser.login());
    if(message == null){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no conversation between these 2 users");
    }
    else{
      return ResponseEntity.ok(message);
    }
  }



}
