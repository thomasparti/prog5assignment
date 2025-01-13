package school.prog5assignment.bean;

import java.time.LocalDateTime;

public record ErrorDTO(
        int status,
        LocalDateTime timestamp,
        String errorMessage
) {
}
