<?php get_header(); ?>

  <div class="col-9">
    <section id="primary" class="content-area">
      <main id="main" class="site-main">

        <?php

        /* Start the Loop */
        while ( have_posts() ) :
          the_post();

          get_template_part( 'template-parts/content/content', 'page' );

          // If comments are open or we have at least one comment, load up the comment template.
          if ( comments_open() || get_comments_number() ) {
            comments_template();
          }

        endwhile; // End of the loop.
        ?>

      </main><!-- #main -->
    </section><!-- #primary -->
  </div>
  <div class="col-3">
    <?php dynamic_sidebar( 'home_right' ); ?>
  </div>

<?php get_footer();