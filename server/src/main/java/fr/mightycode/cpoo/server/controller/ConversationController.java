package fr.mightycode.cpoo.server.controller;

import fr.mightycode.cpoo.server.dto.ConversationDisplayDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.service.ConversationService;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("conversation")
@RequiredArgsConstructor
public class ConversationController {
  private final ConversationService conversationService;

  @PostMapping(value = "addConversation", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Conversation> addConversation(@RequestBody Conversation conversation) {
    Conversation c = conversationService.addConversation(conversation);
    if (c != null) {
      return ResponseEntity.ok(c);
    } else {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user != username1 of the conversation ou il existe deja une conversation");
    }
  }

  @GetMapping(value = "getAllConversationsOfUser", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ArrayList<ConversationDisplayDTO>> getAllConversationOfUser(){
    ArrayList<ConversationDisplayDTO> c = conversationService.getAllConversationDTOCurrentUser();
    if(!c.equals(new ArrayList<>())) {
      return ResponseEntity.ok(c);
    }
    else{
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Current user does not have any conversation");
    }
  }

}
