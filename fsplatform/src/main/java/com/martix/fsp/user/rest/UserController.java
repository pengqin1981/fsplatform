package com.martix.fsp.user.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

	@RequestMapping("/api/users")
	@ResponseBody
	public String ping() {
		return "Hello World";
	}
	
}
