package com.martix.fsp.login.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.martix.fsp.user.domain.User;

@Controller
public class LoginController {
	@RequestMapping("/login.html")
	public ModelAndView loginPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/login.jsp");
		login.addObject("version", "0.1");
		return login;
	}
	
	@RequestMapping(value = "/unsecured/api/auth", method = RequestMethod.POST)  
	@ResponseBody
	public ResponseEntity<?> authenciate(@ModelAttribute("user") User user, Model model, HttpServletResponse response) {
		if (user.getUsername().equals("admin") && 
			user.getPassword().equals("passw0rd")) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.FORBIDDEN);
	}
}
