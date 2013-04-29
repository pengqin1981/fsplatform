package com.martix.fsp.common.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CommonView {
	@RequestMapping("/index.htm")
	public ModelAndView loginPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/index.jsp");
		login.addObject("version", "0.1");
		return login;
	}
	@RequestMapping("/test.htm")
	public ModelAndView testPage() {
		ModelAndView login = new ModelAndView("/WEB-INF/views/test.jsp");
		login.addObject("version", "0.1");
		return login;
	}
}
