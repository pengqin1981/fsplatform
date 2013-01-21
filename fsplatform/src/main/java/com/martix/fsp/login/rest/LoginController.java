package com.martix.fsp.login.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
	@RequestMapping("/unsecured/api/auth")
	@ResponseBody
	public String authenciate() {
		return "";
	}
}
