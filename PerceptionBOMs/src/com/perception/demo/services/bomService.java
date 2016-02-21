package com.perception.demo.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.perception.demo.services.pojo.Part;

@Path("/bomService")
public class bomService {

	  @GET
	  @Produces(MediaType.APPLICATION_JSON)
	  public Part sayPlainTextHello() {
		  Part pt = new Part();
		  pt.setDescription("Test Desc");
		  pt.setPartNumber("ABC-123");
		  pt.setType("Resistor");
		  return pt;
	  }


}
