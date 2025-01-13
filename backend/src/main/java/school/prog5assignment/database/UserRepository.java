package school.prog5assignment.database;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import school.prog5assignment.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends ListCrudRepository<User, Long> {
    Optional<User> findByUsernameIs(String username);
}
