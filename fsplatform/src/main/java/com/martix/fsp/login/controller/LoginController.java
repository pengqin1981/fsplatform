package com.martix.fsp.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
	@RequestMapping("/login.html")
	public ModelAndView loginPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/login.jsp");
		login.addObject("version", "0.1");
		return login;
	}
	
	@RequestMapping("/unsecured/api/auth")
	@ResponseBody
	public String authenciate() {
		return "";
	}
}
