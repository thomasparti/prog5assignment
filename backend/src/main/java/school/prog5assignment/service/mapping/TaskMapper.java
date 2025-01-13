package school.prog5assignment.service.mapping;

import org.mapstruct.Mapping;
import school.prog5assignment.bean.TaskDTO;
import school.prog5assignment.entity.Task;
import org.mapstruct.Mapper;

@Mapper(config = MappingConfig.class)
public interface TaskMapper extends GenericMapper<Task, TaskDTO> {
    @Mapping(target = "owner", ignore = true)
    @Override
    Task toEntity(TaskDTO dto);

}
