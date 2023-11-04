package fr.mightycode.cpoo.server.controller;

import fr.mightycode.cpoo.server.dto.UserCredentialsDTO;
import fr.mightycode.cpoo.server.dto.UserProfileDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

  private final UserService userService;

  private final HttpServletRequest httpServletRequest;


  @PostMapping(value = "signup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Map<String, String>> signup(@RequestBody final UserCredentialsDTO user) {
    try {
      boolean connected = userService.signup(user.login(), user.password());
      if (!connected)
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Already signed in");
      else {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Connection réussi!!!");
        return ResponseEntity.ok(response);
      }
    } catch (Exception ex) {
      if (ex.getCause() instanceof BadCredentialsException) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad credentials");
      }
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }
  @GetMapping(value = "all", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UserProfileDTO>> getAllUsers() {
    List<UserProfileDTO> allUsers = userService.getAllUsers();
    return ResponseEntity.ok(allUsers);
  }

  @PostMapping(value = "signin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Map<String, String>> signin(@RequestBody final UserCredentialsDTO user) {
    try {
      int connected = userService.signin(user.login(), user.password());
      if (connected == 0)
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Already signed in");
      else if (connected == 1) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Connection réussi!!!" + user.login());
        return ResponseEntity.ok(response);
      } else if (connected == 2) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Mot de passe erroné");
      }
    }
    catch (final ServletException ex) {
      if (ex.getCause() instanceof BadCredentialsException) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad credentials");
      }
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
      return null;
  }



  @GetMapping(value = "username", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Map<String, String>> getUserName() {
    String username = userService.getUsername();
    if (username != null) {
      Map<String, String> response = new HashMap<>();
      response.put("username", username);
      return ResponseEntity.ok(response);
    } else {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
    }
  }


  @GetMapping(value = "profile", produces = MediaType.APPLICATION_JSON_VALUE)
  public UserProfileDTO profile(Principal user) {
    return new UserProfileDTO(user.getName());
  }

  @PostMapping(value = "signout")
  public void signout() {
    try {
      userService.signout();
    }
    catch (final ServletException ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }

  @DeleteMapping(value = "/{login}")
  public void delete(@PathVariable("login") String login) {
    if (!userService.delete(login))
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
  }
}
