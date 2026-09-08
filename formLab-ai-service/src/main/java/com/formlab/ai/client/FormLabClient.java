package com.formlab.ai.client;

import com.formlab.ai.dto.input.PersonalRecordsResponse;
import com.formlab.ai.dto.input.ProgressDataResponse;
import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.input.StrengthProgressResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.UUID;

@Component
public class FormLabClient {

    private final RestClient restClient;

    public FormLabClient(
            RestClient.Builder restClientBuilder,
            @Value("${formlab.backend.url}") String backendUrl
    ) {
        this.restClient = restClientBuilder
                .baseUrl(backendUrl)
                .build();
    }

    public ProgressDataResponse getProgressData(
            String accessToken
    ) {
        return restClient
                .get()
                .uri("/api/me/progress-data")
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + accessToken
                )
                .retrieve()
                .body(ProgressDataResponse.class);
    }

    public PersonalRecordsResponse getPersonalRecords(
            String accessToken
    ) {
        return restClient
                .get()
                .uri("/api/me/progress/personal-records")
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + accessToken
                )
                .retrieve()
                .body(PersonalRecordsResponse.class);
    }

    public StrengthProgressResponse getStrengthProgress(
            String accessToken,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/me/progress/strength")
                        .queryParam("exerciseId", exerciseId)
                        .queryParam("range", range)
                        .build()
                )
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + accessToken
                )
                .retrieve()
                .body(StrengthProgressResponse.class);
    }
}