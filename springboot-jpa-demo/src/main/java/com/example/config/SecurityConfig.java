package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.service.UserDetailsServiceImpl;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;

	// @Override
	// @Bean
	// public AuthenticationManager authenticationManagerBean() throws Exception
	// {
	// return super.authenticationManagerBean();
	// }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers("/*").hasAnyRole("ADMIN", "USER")
				.antMatchers(HttpMethod.DELETE, "/user/*").hasAnyRole("ADMIN").antMatchers(HttpMethod.POST, "/user/*")
				.hasAnyRole("ADMIN").antMatchers(HttpMethod.PUT, "/user/*").hasAnyRole("ADMIN")
				.antMatchers(HttpMethod.GET, "/user/*").hasAnyRole("ADMIN", "USER").and().httpBasic()
				.realmName("Topic security application Realm").authenticationEntryPoint(authenticationEntryPoint);
	}

	// @Bean
	// public PasswordEncoder passwordEncoder() {
	// return new BCryptPasswordEncoder();
	// }

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// BCryptPasswordEncoder bCryptPasswordEncoder = new
		// BCryptPasswordEncoder();
		auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(new BCryptPasswordEncoder());
	}
}