package school.prog5assignment.service;

import school.prog5assignment.bean.TaskDTO;
import school.prog5assignment.bean.TaskSaveRequest;
import school.prog5assignment.database.TaskRepository;
import school.prog5assignment.entity.Task;
import school.prog5assignment.entity.User;
import school.prog5assignment.entity.UserPrincipal;
import school.prog5assignment.service.mapping.TaskMapper;
import school.prog5assignment.service.mapping.TaskSaveRequestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final TaskSaveRequestMapper taskSaveRequestMapper;

    public List<TaskDTO> listAll() {
        User currentUser = getCurrentUser();
        return this.taskMapper.toDto(this.taskRepository.findAllByOwnerId(currentUser.getId()));
    }

    public TaskDTO getById(Long id) {
        Task task = this.taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No task with id: " + id));
        User currentUser = getCurrentUser();
        if (!task.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalArgumentException("Access denied: Not your task");
        }
        return this.taskMapper.toDto(task);
    }

    public TaskDTO create(TaskSaveRequest request) {
        Task entity = this.taskSaveRequestMapper.toEntity(request);
        entity.setOwner(getCurrentUser());
        return this.taskMapper.toDto(this.taskRepository.save(entity));
    }

    public TaskDTO update(Long id, TaskSaveRequest request) {
        Task entity = this.taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No task with id: " + id));
        User currentUser = getCurrentUser();
        if (!entity.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalArgumentException("Access denied: Not your task");
        }
        this.taskSaveRequestMapper.mapToTarget(entity, request);
        return this.taskMapper.toDto(this.taskRepository.save(entity));
    }

    public void delete(Long id) {
        Task task = this.taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No task with id: " + id));
        User currentUser = getCurrentUser();
        if (!task.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalArgumentException("Access denied: Not your task");
        }
        this.taskRepository.delete(task);
    }

    public List<TaskDTO> search(String query) {
        User currentUser = getCurrentUser();
        List<Task> tasks = this.taskRepository.searchByOwnerId(currentUser.getId(), query);
        return this.taskMapper.toDto(tasks);
    }

    private User getCurrentUser() {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getUser();
    }
}
