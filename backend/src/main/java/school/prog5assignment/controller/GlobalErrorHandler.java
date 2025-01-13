package school.prog5assignment.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import school.prog5assignment.bean.ErrorDTO;

import java.time.LocalDateTime;

@Slf4j
@ControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleException(Exception e) {
        log.error(e.getMessage(), e);

        int status = HttpStatus.INTERNAL_SERVER_ERROR.value();

        return ResponseEntity.internalServerError()
                .body(new ErrorDTO(status, LocalDateTime.now(), "Internal Server Error"));
    }
}

