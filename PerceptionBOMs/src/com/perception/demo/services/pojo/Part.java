package com.perception.demo.services.pojo;

public class Part {
	private String partNumber;
	private String type;
	private String description;
	private int quantity = 0;
	
	public Part(){}
	
	public Part(String type, String partNumber, String descirption){
		this.partNumber = partNumber;
		this.type = type;
		this.description = descirption;
	}
	
	public Part(String type, String partNumber, String descirption, int qty){
		this.partNumber = partNumber;
		this.type = type;
		this.description = descirption;
		this.quantity = qty;
	}
	
	public String getPartNumber() {
		return partNumber;
	}
	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "Part [title=" + partNumber + ", type=" + type + "]";
	}
}
