package school.prog5assignment.database;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import school.prog5assignment.entity.Task;

import java.util.List;

@Repository
public interface TaskRepository extends ListCrudRepository<Task, Long> {

    List<Task> findAllByOwnerId(Long ownerId);

    @Query("SELECT t FROM Task t WHERE t.owner.id = :ownerId AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Task> searchByOwnerId(@Param("ownerId") Long ownerId, @Param("search") String search);
}
