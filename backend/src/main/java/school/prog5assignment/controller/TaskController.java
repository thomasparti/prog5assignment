package school.prog5assignment.controller;

import school.prog5assignment.bean.ErrorDTO;
import school.prog5assignment.bean.TaskDTO;
import school.prog5assignment.bean.TaskSaveRequest;
import school.prog5assignment.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/task", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponse(responseCode = "200", description = "Successful request")
@ApiResponse(responseCode = "500", description = "Internal server error",
        content = @Content(schema = @Schema(implementation = ErrorDTO.class)))
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    @Operation(summary = "All tasks", description = "List all tasks for the logged in user")
    public List<TaskDTO> getAll() {
        return this.taskService.listAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by id", description = "Get task by id")
    public TaskDTO getById(@PathVariable Long id) {
        return this.taskService.getById(id);
    }

    @PostMapping
    @Operation(summary = "Create task", description = "Create a new task for the logged in user")
    public TaskDTO create(@RequestBody TaskSaveRequest request) {
        return this.taskService.create(request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Edit task", description = "Edit an existing task by id")
    public TaskDTO update(@PathVariable Long id, @RequestBody TaskSaveRequest request) {
        return this.taskService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task", description = "Delete a task by id")
    public void delete(@PathVariable Long id) {
        this.taskService.delete(id);
    }

    @GetMapping("/search")
    @Operation(summary = "Search tasks",
            description = "Search for tasks by title or description")
    public List<TaskDTO> searchTasks(@RequestParam("query") String query) {
        return this.taskService.search(query);
    }
}
