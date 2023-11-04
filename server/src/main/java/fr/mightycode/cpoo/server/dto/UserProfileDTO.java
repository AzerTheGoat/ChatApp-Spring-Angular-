package fr.mightycode.cpoo.server.dto;

public record UserProfileDTO(String login) {
    public String getlogin(){
        return login;
    }
}
