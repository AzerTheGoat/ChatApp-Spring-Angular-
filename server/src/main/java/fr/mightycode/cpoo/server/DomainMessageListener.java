package fr.mightycode.cpoo.server;

import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.service.MessageService;
import fr.mightycode.cpoo.server.service.RouterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DomainMessageListener implements RouterService.MessageListener {

  @Value("${cpoo.server.domain}")
  private String serverDomain;

  @Value("${cpoo.router.url}")
  private String routerUrl;

  private final MessageService messageService;

  @Override
  public String getServerDomain() {
    return serverDomain;
  }

  @Override
  public String getRouterUrl() {
    return routerUrl;
  }

  @Override
  public void onMessageReceived(RouterService.Message routerMessage) {
    log.info("Storing message received from router: {}", routerMessage);
    messageService.storeMessage(new Message(routerMessage));
  }
}
