<?php get_header(); ?>

  <div class="col-9">
    <h2>Hello</h2>
    <p>Welcome to the home page of my simple website. Most of the content you are going to see here is like that,
       because I need to simulate real content in order to properly test my custom theme. Unfortunately, I am unable to
       think of something creative to do on this front page, so I'll just output text.</p>
  </div>
  <div class="col-3">
    <?php dynamic_sidebar('home_right'); ?>
  </div>

<?php get_footer();