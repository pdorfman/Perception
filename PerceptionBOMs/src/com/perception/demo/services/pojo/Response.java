package com.perception.demo.services.pojo;

import java.util.ArrayList;
import java.util.List;

public class Response {
	
	public static final String SUCCESS = "success";
	public static final String FAILURE = "failure";
	
	private String status;
	private List<String> messages;
	
	public Response(String status){
		this.status = status;
		this.messages = new ArrayList<String>();
	}
	
	public Response(String status, String message){
		this.status = status;
		this.messages = new ArrayList<String>();
		this.addMessage(message);
	}
	
	public Response(String status, List<String> messages){
		this.status = status;
		this.messages = messages;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}

	public void addMessage(String message) {
		this.messages.add(message);
	}
}
