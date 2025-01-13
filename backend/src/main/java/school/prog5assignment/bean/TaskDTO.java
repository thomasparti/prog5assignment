package school.prog5assignment.bean;

import jakarta.persistence.Id;
import school.prog5assignment.entity.User;

public record TaskDTO(
        Long id,
        String title,
        String description
) {
}
