package fr.mightycode.cpoo.router.service;

import fr.mightycode.cpoo.router.model.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RouterService {

  private final SimpMessagingTemplate messagingTemplate;

  public void routeMessage(Message message, StompHeaderAccessor accessor) {
    log.info("Routing message {}", message);
    // TODO: check destination domain validity
    String destinationDomain = message.getTo().split("@")[1];
    messagingTemplate.convertAndSend("/domain/" + destinationDomain + "/messages", message);
  }
}
