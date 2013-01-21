package com.martix.fsp.login.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginView {
	@RequestMapping("/login.html")
	public ModelAndView loginPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/login.jsp");
		login.addObject("version", "0.1");
		return login;
	}
}
