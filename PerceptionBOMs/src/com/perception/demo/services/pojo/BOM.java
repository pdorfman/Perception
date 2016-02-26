package com.perception.demo.services.pojo;

import java.util.ArrayList;
import java.util.List;

public class BOM {
	
	private String description;
	private String number;
	List<Part> parts = new ArrayList<Part>();
	
	public BOM(){}
	
	public BOM(String number, String description){
		this.number = number;
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getNumber() {
		return number;
	}
	
	public void setNumber(String number) {
		this.number = number;
	}
	
	public List<Part> getParts() {
		return parts;
	}
	
	public void setParts(List<Part> parts) {
		this.parts = parts;
	}
}
