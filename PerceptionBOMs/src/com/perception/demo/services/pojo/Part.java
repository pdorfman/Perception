package com.perception.demo.services.pojo;

public class Part {
	
	private String number;
	private String type;
	private String description;
	private String imageURL;
	private String datasheetURL;
	private int quantity = 0;
	
	public Part(){}
	
	public Part(String type, String number, String descirption, String datasheetURL, String imageURL){
		this.number = number;
		this.type = type;
		this.description = descirption;
		this.datasheetURL = datasheetURL;
		this.imageURL = imageURL;
	}
	
	public String getNumber() {
		return number;
	}
	
	public void setNumber(String number) {
		this.number = number;
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

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getDatasheetURL() {
		return datasheetURL;
	}

	public void setDatasheetURL(String datasheetURL) {
		this.datasheetURL = datasheetURL;
	}

	@Override
	public String toString() {
		return "Part [title=" + number + ", type=" + type + "]";
	}
}
