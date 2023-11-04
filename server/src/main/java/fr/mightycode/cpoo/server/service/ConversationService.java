package fr.mightycode.cpoo.server.service;

import fr.mightycode.cpoo.server.dto.ConversationDisplayDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ConversationService {
  private final ConversationRepository conversationRepository;
  private final CustomUserRepository customUserRepository;
  private final MessageService messageService;

  public Conversation addConversation(Conversation c){
    //le username du user qui utilise cette fonction doit etre obligatoirement le user avec le username1
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails){
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return null;
    }

    //voir si il existe deja une conversation entre mes 2 users
    if((!conversationRepository.findConversationsByUsername1OrUsername2(c.getUsername1(), c.getUsername2()).isEmpty()||(!conversationRepository.findConversationsByUsername1OrUsername2(c.getUsername2(), c.getUsername1()).isEmpty()))){
      return null;
    }

    if(c.getUsername1().equals(usernameCurentUser)) {
      conversationRepository.save(c);
      return c;
    }return null;
  }

  public ArrayList<ConversationDisplayDTO> getAllConversationDTOCurrentUser(){
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails){
      CustomUser c = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = c.getUsername();
    } else {
      return null;
    }
    List<Conversation> c = conversationRepository.findConversationsByUsername1OrUsername2(usernameCurentUser, usernameCurentUser);
    ArrayList<ConversationDisplayDTO> cDTO = new ArrayList<>();
    for(Conversation conv : c){
      if(usernameCurentUser == conv.getUsername1()) {
        CustomUser customUser = customUserRepository.findByUsername(conv.getUsername2());
        Message lastMessage = messageService.getLastMessageOfConversation(conv.getUsername2());
        ConversationDisplayDTO convDTO = new ConversationDisplayDTO(conv.getUsername2(), customUser.getPictureBase64(), lastMessage.getBody(), lastMessage.getTimestamp(), conv.isSeen());
        cDTO.add(convDTO);
      } else if (usernameCurentUser == conv.getUsername2()) {
        CustomUser customUser = customUserRepository.findByUsername(conv.getUsername1());
        Message lastMessage = messageService.getLastMessageOfConversation(conv.getUsername1());
        ConversationDisplayDTO convDTO = new ConversationDisplayDTO(conv.getUsername1(), customUser.getPictureBase64(), lastMessage.getBody(), lastMessage.getTimestamp(), conv.isSeen());
        cDTO.add(convDTO);
      }
    }

    return cDTO;
  }

  public void deleteConversation(Conversation c){
    //le username du user qui utilise cette fonction doit etre obligatoirement le user avec le username1
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails){
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    }
    if(c.getUsername1() == usernameCurentUser || c.getUsername2() == usernameCurentUser) {
      conversationRepository.delete(c);
    }
  }

}
