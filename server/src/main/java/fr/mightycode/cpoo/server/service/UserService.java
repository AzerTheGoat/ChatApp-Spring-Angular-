package fr.mightycode.cpoo.server.service;

import fr.mightycode.cpoo.server.dto.ConversationDisplayDTO;
import fr.mightycode.cpoo.server.dto.UserProfileDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
  private final ConversationService conversationService;

  private final PasswordEncoder passwordEncoder;

  private final UserDetailsManager userDetailsManager;

  private final CustomUserRepository customUserRepository;

  private final HttpServletRequest httpServletRequest;

  public boolean signup(final String login, final String password){
    final CustomUser customUser = new CustomUser();
    customUser.setUsername(login);
    customUser.setConversations(new ArrayList<>());
    customUser.setPictureBase64("AYMANE ZAMLLL");
    customUser.setPassword(passwordEncoder.encode(password));
    customUserRepository.save(customUser);

    return true;
  }
  public int signin(final String login, final String password) throws ServletException {
    CustomUser c = customUserRepository.findByUsername(login);
    System.out.println(password);
    System.out.println("MA BASE DE DONNEES :");
    for(CustomUser j : customUserRepository.findAll()){
      System.out.print(j.getUsername());
      System.out.print("  " +j.getPassword());
    }


    // Use passwordEncoder.matches to compare passwords
    if (passwordEncoder.matches(password, c.getPassword())) {
      final HttpSession session = httpServletRequest.getSession(false);
      if (session != null)
        return 0;

      System.out.println("l7WA");
      userDetailsManager.createUser(new User(login, c.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER"))));
      System.out.println("l7WA22");
      httpServletRequest.login(login, password);
      httpServletRequest.getSession(true);
      return 1;
    }

    return 2;
  }
  public List<UserProfileDTO> getAllUsers() {
    List<UserProfileDTO> allUsers = customUserRepository.findAll().stream()
            .map(user -> new UserProfileDTO(user.getUsername()))
            .collect(Collectors.toList());
    return allUsers;
  }

  public List<UserProfileDTO> searchUsers(String term) {
    List<UserProfileDTO> matchingUsers = new ArrayList<>();

    for (UserProfileDTO user : getAllUsers()) {
        if (user.getlogin().toLowerCase().contains(term.toLowerCase())) {
            matchingUsers.add(user);
        }
    }

    return matchingUsers;
}



  public void signout() throws ServletException {
    User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    userDetailsManager.deleteUser(u.getUsername());
    httpServletRequest.logout();
  }

  public boolean delete(String login) {
    User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (u.getUsername().equals(login)) {
      if (!userDetailsManager.userExists(login))
        return false;
      userDetailsManager.deleteUser(login);
      CustomUser userDelete = customUserRepository.findByUsername(login);
      customUserRepository.delete(userDelete);
      return true;
    }
    return false;
  }

  public String getUserLogin() {
    final HttpSession session = httpServletRequest.getSession(true);
    if (session != null)
      return null;
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    if (principal instanceof UserDetails){
      CustomUser c = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      return c.getUsername();
    } else {
      return "Principal is not an instance of CustomUserDetails";
    }
  }
  public String getUsername() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails){
      CustomUser c = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      return c.getUsername();
    } else {
      return "Principal is not an instance of CustomUserDetails";
    }
  }


}
