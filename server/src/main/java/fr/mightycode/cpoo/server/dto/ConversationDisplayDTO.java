package fr.mightycode.cpoo.server.dto;

public record ConversationDisplayDTO(String username, String picture, String lastMessage, long timestamp, boolean isSeen) {
}
