package school.prog5assignment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Task {

    @Id
    private Long id;
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false, referencedColumnName = "id")
    private User owner;
}
