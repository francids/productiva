package com.francids.productiva_mente.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MainController {
  @GetMapping("/")
  public Map<String, String> index() {
    Map<String, String> map = new HashMap<>();
    map.put("message", "Welcome to Productiva Mente Backend!");
    return map;
  }

  @GetMapping("/ping")
  public Map<String, String> ping() {
    Map<String, String> map = new HashMap<>();
    map.put("message", "pong");
    return map;
  }
}
