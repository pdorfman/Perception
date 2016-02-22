package com.perception.demo.services.pojo;

import java.util.ArrayList;
import java.util.List;

public class PartsList {
	List<Part> resistors = new ArrayList<Part>();
	List<Part> capacitors = new ArrayList<Part>();
	List<Part> diodes = new ArrayList<Part>();

	public void addPart(Part part){
		if(part.getType().equals("Resistor")){
			resistors.add(part);
		}else if(part.getType().equals("Capacitor")){
			capacitors.add(part);
		}else if(part.getType().equals("Diode")){
			diodes.add(part);
		}
	}
	public List<Part> getResistors() {
		return resistors;
	}
	public void setResistors(List<Part> resistors) {
		this.resistors = resistors;
	}
	public List<Part> getCapacitors() {
		return capacitors;
	}
	public void setCapacitors(List<Part> capacitors) {
		this.capacitors = capacitors;
	}
	public List<Part> getDiodes() {
		return diodes;
	}
	public void setDiodes(List<Part> diodes) {
		this.diodes = diodes;
	}
}
