package school.prog5assignment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
@Entity
public class Role implements GrantedAuthority {

    @Id
    private Long id;
    private String rolename;

    @Override
    public String getAuthority() {
        return this.rolename;
    }
}
