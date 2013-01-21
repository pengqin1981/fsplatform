package com.martix.fsp.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	@RequestMapping("/blank.html")
	public ModelAndView blankPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/blank.html");
		return login;
	}

	@RequestMapping("/index.html")
	public ModelAndView loginPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/index.jsp");
		login.addObject("version", "0.1");
		return login;
	}
}
