package fr.mightycode.cpoo.server.dto;

import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.service.RouterService;

public record MessageDTO(long timestamp, String from, String to, String type, String body) {

  // Build a message DTO from a router message
  public MessageDTO(RouterService.Message message) {
    this(message.timestamp(), message.from(), message.to(), message.type(), message.body());
  }

  // Build a message DTO from a model message
  public MessageDTO(Message message) {
    this(message.getTimestamp(), message.getFrom(), message.getTo(), message.getType(), message.getBody());
  }
}
