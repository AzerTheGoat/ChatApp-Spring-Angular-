/*
 * GoatChat API
 * server API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package org.openapitools.client.api;

import okhttp3.OkHttpClient;
import org.junit.jupiter.api.*;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.model.UserCredentialsDTO;
import org.openapitools.client.model.UserProfileDTO;

import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * API tests for UserApi
 */
public class UserApiTest {

    private final UserApi api = new UserApi();

    @BeforeEach
    public void init() throws ApiException {
        // Simulate the behavior of a web browser by remembering cookies set by the server
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        OkHttpClient okHttpClient = builder.cookieJar(new MyCookieJar()).build();
        ApiClient apiClient = new ApiClient(okHttpClient);
        api.setApiClient(apiClient);
    }


    /**
     * DELETE user/{login}
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deleteTest() throws ApiException {
        // Create a user
        UserCredentialsDTO userCredentialsDTO = new UserCredentialsDTO();
        userCredentialsDTO
                .login("hamzaa")
                .password("pwd");

        // Sign up the user
        api.signup(userCredentialsDTO);
        api.signin(userCredentialsDTO);
        // Try to delete a non-existent user (should return HttpStatus.NOT_FOUND)
        try {
            api.delete("nonExistentUser");
            Assertions.fail("Deleting a non-existent user should result in an exception");
        } catch (ApiException e) {
            Assertions.assertEquals(404, e.getCode());
        }

        // Delete the user created earlier
        api.delete(userCredentialsDTO.getLogin());

        api.signout();
    }


    /**
     * GET user/all
     *
     * @throws ApiException if the Api call fails
     */

    /**
     * GET user/username
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void getUserNameTest() throws ApiException {
        UserCredentialsDTO userCredentialsDTOvalide = new UserCredentialsDTO();
        userCredentialsDTOvalide
                .login("hamzargac")
                .password("pwd");

        try {
            String response = api.getUserName();
            Assertions.fail();
        }catch(ApiException e){
            Assertions.assertEquals(403, e.getCode());
        }
        api.signup(userCredentialsDTOvalide);
        api.signin(userCredentialsDTOvalide);

        String response = api.getUserName();
        System.out.println(response);
        api.delete(userCredentialsDTOvalide.getLogin());
        api.signout();
    }

    /**
     * GET user/profile
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void profileTest() throws ApiException {
        UserCredentialsDTO userCredentialsDTOvalide = new UserCredentialsDTO();
        userCredentialsDTOvalide
                .login("hamzakghjlrrdnt")
                .password("pwd");


        try {
            api.profile();
            Assertions.fail();
        }catch(ApiException e){
            Assertions.assertEquals(403, e.getCode());
        }

        api.signup(userCredentialsDTOvalide);
        api.signin(userCredentialsDTOvalide);

        api.profile();

        api.delete(userCredentialsDTOvalide.getLogin());
        api.signout();
    }

    /**
     * POST user/signin
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void signinTest() throws ApiException {
        UserCredentialsDTO userCredentialsDTOvalide = new UserCredentialsDTO();
        userCredentialsDTOvalide
                .login("hamzakghjlrrdnt")
                .password("pwd");

        try {
            String response = api.signin(userCredentialsDTOvalide);
            Assertions.fail();
        }catch(ApiException e){
            Assertions.assertEquals(500, e.getCode());
        }

        api.signup(userCredentialsDTOvalide);
        api.signin(userCredentialsDTOvalide);

        try {
            String  response2 = api.signin(userCredentialsDTOvalide);
            Assertions.fail();
        }catch (ApiException e) {
            Assertions.assertEquals(409, e.getCode());
        }
        api.delete(userCredentialsDTOvalide.getLogin());
        api.signout();
    }

    /**
     * POST user/signout
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void signoutTest() throws ApiException {
        UserCredentialsDTO userCredentialsDTOvalide = new UserCredentialsDTO();
        userCredentialsDTOvalide
                .login("hamzakghjlrrdnt")
                .password("pwd");

        api.signup(userCredentialsDTOvalide);
        api.signin(userCredentialsDTOvalide);

        api.delete(userCredentialsDTOvalide.getLogin());
        api.signout();

        try {
            api.signout();
            Assertions.fail();
        }catch(ApiException e){
            Assertions.assertEquals(403, e.getCode());
        }
    }

    /**
     * POST user/signup
     *
     * @throws ApiException if the Api call fails
     */

    @Test
    public void signupTest() throws ApiException {
        UserCredentialsDTO userCredentialsDTO = new UserCredentialsDTO()
                .login("hamzarzcdekgfytc")
                .password("pwd");
        String  response = api.signup(userCredentialsDTO);
        try {
            String response2 = api.signup(userCredentialsDTO);
        }catch(ApiException e){
            Assertions.assertEquals(500, e.getCode());
        }
        api.signin(userCredentialsDTO);
        api.delete(userCredentialsDTO.getLogin());
        api.signout();
    }

}
