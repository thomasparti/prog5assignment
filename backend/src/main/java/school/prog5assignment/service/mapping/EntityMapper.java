package school.prog5assignment.service.mapping;

public interface EntityMapper<E, D> {

    E toEntity(D dto);
}
