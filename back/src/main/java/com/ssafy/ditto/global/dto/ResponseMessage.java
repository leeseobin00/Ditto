package com.ssafy.ditto.global.dto;

public enum ResponseMessage {
    // Success messages
    SUCCESS("Successfully"),
    SUCCESS_WRITE("Successfully created."),
    SUCCESS_UPDATE("Successfully updated."),
    SUCCESS_DELETE("Successfully deleted."),
    SUCCESS_FETCH("Data fetched successfully."),
    SUCCESS_LIKE("Post liked successfully."),
    SUCCESS_UNLIKE("Like removed successfully."),
    SUCCESS_LOGIN("Login successful."),
    SUCCESS_LOGOUT("Logout successful."),
    SUCCESS_REGISTER("Registration successful."),
    SUCCESS_CONVERT("Convert successful"),

    // Error messages
    ERROR_WRITE("Failed at creating."),
    ERROR_UPDATE("Failed at updating."),
    ERROR_DELETE("Failed at deleting."),
    ERROR_FETCH("Failed at fetching."),
    ERROR_LIKE("Failed at like."),
    ERROR_UNLIKE("Failed at remove like."),
    ERROR_LOGIN("Failed at login."),
    ERROR_LOGOUT("Failed at logout."),
    ERROR_REGISTER("Failed at register."),

    // Validation messages
    VALIDATION_FAILED("Validation failed."),
    INVALID_INPUT("Invalid input provided."),
    UNAUTHORIZED_ACCESS("Unauthorized access."),
    ACCESS_DENIED("Access denied."),
    NOT_FOUND("Resource not found."),
    INTERNAL_SERVER_ERROR("Internal server error."),

    // Informational messages
    SESSION_EXPIRED("Session expired."),
    PASSWORD_RESET("Password reset successful."),
    EMAIL_SENT("Email sent successfully."),
    EMAIL_NOT_SENT("Failed to send email.");

    private final String message;

    ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
