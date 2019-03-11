<?php

function header_title_link_callback() {
  $options = get_option('header_title_link');
  echo '<input name="header_title_link" id="header_title_link" value="1" type="checkbox" class="code" ' . checked(1, $options, false) . ' /> Make header title link to home page.';
}

function background_color_callback() {
  $options = get_option('background_color');
  echo '<input name="background_color" id="background_color" type="color" class="code" value="' . $options . '" />';
}

function test_theme_settings() {
  add_settings_section('theme_settings_section', null, null, 'theme-options');

  add_option('header_title_link', 1);
  add_settings_field('header_title_link', 'Header Link Title to Home', 'header_title_link_callback', 'theme-options', 'theme_settings_section');
  register_setting('theme-options', 'header_title_link');

  add_option('background_color');
  add_settings_field('background_color', 'Background Color', 'background_color_callback', 'theme-options', 'theme_settings_section');
  register_setting('theme-options', 'background_color');
}

add_action('admin_init', 'test_theme_settings');

function wpm_theme_settings_page() {
  ?>
  <div class="wrap">
    <h1>Theme Panel for Musaka Theme</h1>
    <form method="post" action="options.php">
      <?php settings_fields("theme-options"); ?>
      <?php do_settings_sections("theme-options"); ?>
      <?php submit_button(); ?>
    </form>
  </div>
  <?php
}

function wpm_add_theme_menu_item() {
  add_menu_page("Musaka Settings", "Musaka Settings", "manage_options", "theme-panel", "wpm_theme_settings_page", null, 99);
}
add_action("admin_menu", "wpm_add_theme_menu_item");
