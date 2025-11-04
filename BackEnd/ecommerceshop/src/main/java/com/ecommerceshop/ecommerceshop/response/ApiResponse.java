package com.ecommerceshop.ecommerceshop.response;

public class ApiResponse {
    String Message;
    boolean Status;

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean status) {
        Status = status;
    }
}
