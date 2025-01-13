package school.prog5assignment.service.mapping;

import school.prog5assignment.bean.TaskSaveRequest;
import school.prog5assignment.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MappingConfig.class)
public interface TaskSaveRequestMapper extends EntityMapper<Task, TaskSaveRequest> {

    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", ignore = true)
    Task toEntity(TaskSaveRequest dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", ignore = true)
    void mapToTarget(@MappingTarget Task target, TaskSaveRequest source);
}

