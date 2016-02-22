package com.perception.demo.services;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.perception.demo.services.pojo.BOM;
import com.perception.demo.services.pojo.Part;
import com.perception.demo.services.pojo.PartsList;

@Path("/bomService")
public class bomService {

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
		List<BOM> boms = new ArrayList<BOM>() ;

		BOM bom1 = new BOM("BOM 1", "Test BOM Desc 1");
		bom1.getParts().add(new Part("Resistor", "Number 1", "Test Desc", 2));
		bom1.getParts().add(new Part("Diode", "Number 2", "Test Desc2", 3));
		boms.add(bom1);

		boms.add(new BOM("BOM 2", "Test BOM Desc 2"));
		boms.add(new BOM("BOM 3", "Test BOM Desc 3"));
		boms.add(new BOM("BOM 4", "Test BOM Desc 4"));
		boms.add(new BOM("BOM 5", "Test BOM Desc 5"));
		boms.add(new BOM("BOM 6", "Test BOM Desc 6"));
		  
		return boms;
	}

}
