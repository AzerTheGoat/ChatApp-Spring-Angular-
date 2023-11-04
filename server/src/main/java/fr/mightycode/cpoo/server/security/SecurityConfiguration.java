package fr.mightycode.cpoo.server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    // Ensure that CORS is applied before authentication, so that OPTIONS requests can be processed unauthenticated.
    http.cors(withDefaults());

    // Disable Cross Site Request Forgery protection
    http.csrf(AbstractHttpConfigurer::disable);

    // Configure endpoint protection
    http.authorizeHttpRequests(authorizeRequests ->
      authorizeRequests
        .requestMatchers(antMatcher("/user/signup")).permitAll()
        .requestMatchers(antMatcher("/user/signin")).permitAll()
        //.requestMatchers(antMatcher(HttpMethod.DELETE, "/user/*")).hasRole("ADMIN")
        .requestMatchers(antMatcher("/error")).permitAll()
        .anyRequest().authenticated());

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public UserDetailsManager userDetailsManager(DataSource dataSource, PasswordEncoder passwordEncoder) {

    // Create a user details manager storing users in the DB
    UserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
//    UserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

    // Create a user account to be used by end-to-end tests
    UserDetails tester = User.withUsername("tester")
      .password(passwordEncoder.encode("tester"))
      .roles("USER")
      .build();
    userDetailsManager.createUser(tester);

    // Create an administrator account
    UserDetails admin = User.withUsername("admin")
      .password(passwordEncoder.encode("admin"))
      .roles("USER", "ADMIN")
      .build();
    userDetailsManager.createUser(admin);

    // Create a user account to use for testing
    UserDetails alice = User.withUsername("alice")
      .password(passwordEncoder.encode("alice"))
      .roles("USER")
      .build();
    userDetailsManager.createUser(alice);

    // Create a user account to use for testing
    UserDetails bob = User.withUsername("bob")
      .password(passwordEncoder.encode("bob"))
      .roles("USER")
      .build();
    userDetailsManager.createUser(bob);

    return userDetailsManager;
  }
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Replace with your frontend URL
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowCredentials(true); // Allow credentials
    configuration.addAllowedHeader("*"); // You can configure specific headers

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}
