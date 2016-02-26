package com.perception.demo.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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

import com.opencsv.CSVReader;
import com.perception.demo.services.pojo.BOM;
import com.perception.demo.services.pojo.Part;
import com.perception.demo.services.pojo.Response;

@Path("/bomService")
public class BOMService {

	// Persistence simulating members
	private static int nextBomIndex 						= 1;
	private static final Map<String,BOM> boms 				= new HashMap<String,BOM>() ;
	
	// Helper constants for reading CSVs
	private static final String CSV_FILE_ROOT 				= "/com/perception/demo/services/data/";
	private static final String CAPACITORS_CSV_FILE_PATH 	= CSV_FILE_ROOT + "Capacitors.csv";
	private static final String DIODES_CSV_FILE_PATH 		= CSV_FILE_ROOT + "Diodes.csv";
	private static final String RESISTORS_CSV_FILE_PATH 	= CSV_FILE_ROOT + "Resistors.csv";
	
	private static final Map<String,List<Part>> partsMap;
	static{
		Map<String,String> partsFilesMap = new HashMap<String,String>();
		partsFilesMap.put("Resistors", RESISTORS_CSV_FILE_PATH);
		partsFilesMap.put("Capacitors", CAPACITORS_CSV_FILE_PATH);
		partsFilesMap.put("Diodes", DIODES_CSV_FILE_PATH);
		partsMap = generatePartsMap(partsFilesMap);
	}
	
	// Read Endpoints
	
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
	
	// Write Endpoints

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
		String nextBOMNumber = "BOM_NUMBER_" + nextBomIndex;
		++nextBomIndex;
		return nextBOMNumber;
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
	
	private static HashMap<String,List<Part>> generatePartsMap(Map<String,String> partsFilesMap){
		HashMap<String,List<Part>> map = new HashMap<String,List<Part>>();
		
		for(Map.Entry<String, String> entry : partsFilesMap.entrySet()){
			
			String csvFile = entry.getValue();
			InputStream in = BOMService.class.getClassLoader().getResourceAsStream(csvFile);
			InputStreamReader isr = new InputStreamReader(in);

			CSVReader reader = null;
			try {
				reader = new CSVReader(isr);
				
				// Build the parts list for this CSV
				List<Part> parts = new ArrayList<Part>();
				String categoryName = entry.getKey();
				String partType = categoryName.substring(0, categoryName.length()-1);
				
				String [] thisPart;
				reader.readNext(); // skip header row
				while ((thisPart = reader.readNext()) != null) {
					Part part = new Part(partType, thisPart[2], thisPart[5]);
					part.setDatasheetURL(thisPart[0]);
					part.setImageURL(thisPart[1]);
					parts.add(part);
			    }
				
				// Add the list to the parts map
				map.put(categoryName, parts);
			     
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				try{
					reader.close();
				}catch(Exception e){}
				try{
					isr.close();
				}catch(Exception e){}
				try{
					in.close();
				}catch(Exception e){}
			}
		}
		return map;
	}

}
