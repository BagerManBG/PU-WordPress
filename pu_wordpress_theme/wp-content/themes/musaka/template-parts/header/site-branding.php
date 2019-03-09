<?php
/**
 * Displays header site branding
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */
?>
<div class="site-branding">

	<?php if ( has_custom_logo() ) : ?>
		<div class="site-logo"><?php the_custom_logo(); ?></div>
	<?php endif; ?>
	<?php $blog_info = get_bloginfo( 'name' ); ?>
	<?php if ( ! empty( $blog_info ) ) : ?>
    <h1 class="site-title">
      <?php if ( get_option('header_title_link') ) : ?>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
      <?php else : bloginfo( 'name' ); ?>
      <?php endif; ?>
    </h1>
	<?php endif; ?>

	<?php
	$description = get_bloginfo( 'description', 'display' );
	if ( $description || is_customize_preview() ) :
		?>
			<p class="site-description">
				<?php echo $description; ?>
			</p>
	<?php endif; ?>
	<?php if ( has_nav_menu( 'main_menu' ) ) : ?>
    <?php
      wp_nav_menu( array(
        'menu' => 'top_menu',
        'depth' => 2,
        'container' => false,
        'menu_class' => 'nav',
        //Process nav menu using our custom nav walker
        'walker' => new wp_bootstrap_navwalker())
      );
    ?>
	<?php endif; ?>
	<?php if ( has_nav_menu( 'social' ) ) : ?>
		<nav class="social-navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'musaka' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'social',
					'menu_class'     => 'social-links-menu',
					'link_before'    => '<span class="screen-reader-text">',
					'link_after'     => '</span>' . twentynineteen_get_icon_svg( 'link' ),
					'depth'          => 1,
				)
			);
			?>
		</nav><!-- .social-navigation -->
	<?php endif; ?>
</div><!-- .site-branding -->
