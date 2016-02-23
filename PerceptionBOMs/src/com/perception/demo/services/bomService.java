package com.perception.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.perception.demo.services.pojo.BOM;
import com.perception.demo.services.pojo.Part;
import com.perception.demo.services.pojo.PartsList;
import com.perception.demo.services.pojo.Response;

@Path("/bomService")
public class bomService {

	private static final Map<String,BOM> boms = new HashMap<String,BOM>() ;
	private static int bomCount = 0;

	@Path("/parts")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public PartsList getPartsList() {
		PartsList parts = new PartsList() ;

		parts.addPart(new Part("Resistor", "Number 1", "Test Desc"));
		parts.addPart(new Part("Resistor", "Number 2", "Test Desc 2"));
		parts.addPart(new Part("Diode", "Number 3", "Test Desc 3 diode"));
		  
		return parts;
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
		
		newBOM.setNumber(getNextBomNumber());
		boms.put(newBOM.getNumber(), newBOM);
		  
		return new Response("success", "BOM successfully saved");
	}
	
	private String getNextBomNumber(){
		++bomCount;
		return "BOM_NUMBER_" + bomCount;
	}

}
