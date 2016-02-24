package com.perception.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.perception.demo.services.pojo.BOM;
import com.perception.demo.services.pojo.Part;
import com.perception.demo.services.pojo.PartsList;
import com.perception.demo.services.pojo.Response;

@Path("/bomService")
public class BOMService {

	private static final Map<String,BOM> boms = new HashMap<String,BOM>() ;
	private static int bomCount = 0;
	private static final Map<String,List<Part>> partsMap = populatePartsMap();
	
	@Path("/parts")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String,List<Part>> getPartsMap() {
		return partsMap;
	}

	@Path("/boms")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<BOM> getBomsList() {
		return new ArrayList<BOM>(boms.values());
	}

	@Path("/boms")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createBOM(BOM newBOM) {

		List<String> errors = validateBOM(newBOM);

		if(errors.size() == 0){
			newBOM.setNumber(getNextBomNumber());
			boms.put(newBOM.getNumber(), newBOM);
			return new Response(Response.SUCCESS, "BOM " + newBOM.getNumber() + " successfully created");
		}else{
			return new Response(Response.FAILURE, errors);
		}
	}

	@Path("/boms/{bomNmber}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBOM(@PathParam("bomNmber") String bomNumber, BOM newBOM) {
		
		List<String> errors = validateBOM(newBOM);
		
		if(errors.size() == 0){
			boms.put(bomNumber, newBOM);
			return new Response(Response.SUCCESS, "BOM " + bomNumber + " successfully updated");
		}else{
			return new Response(Response.FAILURE, errors);
		}
	}

	@Path("/boms/{bomNmber}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteBOM(@PathParam("bomNmber") String bomNumber) {
		boms.remove(bomNumber);
		return new Response(Response.SUCCESS, "BOM " + bomNumber + " successfully deleted");
	}
	
	
	// Helper Methods
	
	private String getNextBomNumber(){
		++bomCount;
		return "BOM_NUMBER_" + bomCount;
	}
	
	private List<String> validateBOM(BOM bom){
		List<String> errors = new ArrayList<String>();
		if(bom.getDescription() == null || bom.getDescription().equals("")){
			errors.add("Description is required");
		}
		if(bom.getParts() == null || bom.getParts().size() == 0){
			errors.add("BOM must have one or more parts.");
		}
		if(bom.getParts() != null){
			for(Part pt : bom.getParts()){
				if(pt.getQuantity() <= 0){
					errors.add("Parts must have a quantity of one or more.");
					break;
				}
			}
		}
		return errors;
	}
	
	private static Map<String,List<Part>> populatePartsMap(){
		HashMap<String,List<Part>> map = new HashMap<String,List<Part>>();

		List<Part> resistors = new ArrayList<Part>();
		List<Part> capacitors = new ArrayList<Part>();
		List<Part> diodes = new ArrayList<Part>();

		resistors.add(new Part("Resistor", "Number 1", "Test Desc resistor"));
		capacitors.add(new Part("Capacitor", "Number 2", "Test Desc 2 capacitor"));
		diodes.add(new Part("Diode", "Number 3", "Test Desc 3 diode"));

		map.put("Resistors", resistors);
		map.put("Capacitors", capacitors);
		map.put("Diodes", diodes);
		
		return map;
	}

}
