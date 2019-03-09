<?php

require_once('wp_bootstrap_navwalker.php');
require_once('options.php');

wp_register_style( 'Bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' );
wp_enqueue_style('Bootstrap');

//wp_register_script( 'jQuery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', null, null, true );
//wp_enqueue_script('jQuery');

function wpm_custom_main_menu() {
  register_nav_menu('main_menu', __('Main Menu'));
}
add_action('init', 'wpm_custom_main_menu' );

function wpm_widgets_init() {
  register_sidebar( array(
    'name'          => 'Home right sidebar',
    'id'            => 'home_right',
    'before_widget' => '<div>',
    'after_widget'  => '</div>',
    'before_title'  => '<h2 class="rounded">',
    'after_title'   => '</h2>',
  ));
}
add_action( 'widgets_init', 'wpm_widgets_init' );
