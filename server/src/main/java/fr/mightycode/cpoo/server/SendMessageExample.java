package fr.mightycode.cpoo.server;

import fr.mightycode.cpoo.server.service.RouterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class SendMessageExample {

  private int i = 0;

  private final RouterService routerService;

  // Build Merkle blocks every 30s
//  @Scheduled(cron = "* * * * * ?")
  public void ping() {
    try {
      RouterService.Message message = new RouterService.Message(
        UUID.randomUUID(),
        System.currentTimeMillis(),
        "alice@acme", "bob@acme",
        MediaType.TEXT_PLAIN_VALUE,
        "This is message " + i++ + " from alice@acme to bob@acme"
      );
      routerService.routeMessage(message);
    }
    catch (Exception e) {
      log.error("Cannot send message", e);
    }
  }
}
