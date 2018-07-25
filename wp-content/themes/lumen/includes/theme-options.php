<?php
/**
 * Initialize the custom theme options.
 */
add_action( 'admin_init', 'custom_theme_options' );

/**
 * Build the custom settings & update OptionTree.
 */
function custom_theme_options() {
  /**
   * Get a copy of the saved settings array. 
   */
  $saved_settings = get_option( 'option_tree_settings', array() );
  
  /**
   * Custom settings array that will eventually be 
   * passes to the OptionTree Settings API Class.
   */
  $custom_settings = array( 
    'contextual_help' => array( 
      'sidebar'       => ''
    ),
    'sections'        => array( 
      array(
        'id'          => 'lumen_general',
        'title'       => 'General'
      ),
      array(
        'id'          => 'lumen_main_menu',
        'title'       => 'Main Menu'
      ),
      array(
        'id'          => 'lumen_section_contact_info',
        'title'       => 'Contact Page'
      ),
      array(
        'id'          => 'lumen_typography',
        'title'       => 'Typography'
      ),
      array(
        'id'          => 'lumen_custom_code',
        'title'       => 'Custom Code'
      )
    ),
    'settings'        => array( 
      array(
        'id'          => 'lumen_home_logo',
        'label'       => 'Homepage Logo<br><img src="http://www.themelock.com/ete.jpg">',
        'desc'        => 'Upload a logo for your homepage.',
        'std'         => '',
        'type'        => 'upload',
        'section'     => 'lumen_general',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_home_logo_max_width',
        'label'       => 'Homepage Logo Max Width',
        'desc'        => 'Set the maximum width for your homepage logo in percentage or pixels (unit has to be indicated: ##px, ##%). This useful if you want a retina ready logo. For example: you can upload a double size image and set its maximum width to 50%. (Default: auto).',
        'std'         => 'auto',
        'type'        => 'text',
        'section'     => 'lumen_general',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_mobile_logo',
        'label'       => 'Logo for Mobile Resolutions',
        'desc'        => 'Upload a logo for mobile resolutions. The logo\'s height will be stretched to 20px, so the image\'s height should be 20px (or 40px if you want retina support). A maximum width of 150px is recommended.',
        'std'         => '',
        'type'        => 'upload',
        'section'     => 'lumen_general',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_site_favicon',
        'label'       => 'Site Favicon',
        'desc'        => 'Upload a favicon for your site.',
        'std'         => '',
        'type'        => 'upload',
        'section'     => 'lumen_general',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_site_default_background',
        'label'       => 'Site Default Background',
        'desc'        => 'All pages that do not have a background set will default to this background.',
        'std'         => '',
        'type'        => 'background',
        'section'     => 'lumen_general',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_nav_background_color',
        'label'       => 'Navigation Background Color',
        'desc'        => 'Select the background color for the main menu.',
        'std'         => '#383d3f',
        'type'        => 'colorpicker',
        'section'     => 'lumen_main_menu',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_nav_opacity',
        'label'       => 'Navigation Background Opacity',
        'desc'        => 'Enter the opacity for the main navigation menu on your site. From 10 to 100%.',
        'std'         => '70%',
        'type'        => 'select',
        'section'     => 'lumen_main_menu',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'choices'     => array( 
          array(
            'value'       => '10%',
            'label'       => '10%',
            'src'         => ''
          ),
          array(
            'value'       => '20%',
            'label'       => '20%',
            'src'         => ''
          ),
          array(
            'value'       => '30%',
            'label'       => '30%',
            'src'         => ''
          ),
          array(
            'value'       => '40%',
            'label'       => '40%',
            'src'         => ''
          ),
          array(
            'value'       => '50%',
            'label'       => '50%',
            'src'         => ''
          ),
          array(
            'value'       => '60%',
            'label'       => '60%',
            'src'         => ''
          ),
          array(
            'value'       => '70%',
            'label'       => '70%',
            'src'         => ''
          ),
          array(
            'value'       => '80%',
            'label'       => '80%',
            'src'         => ''
          ),
          array(
            'value'       => '90%',
            'label'       => '90%',
            'src'         => ''
          ),
          array(
            'value'       => '100%',
            'label'       => '100%',
            'src'         => ''
          )
        ),
      ),
      array(
        'id'          => 'lumen_navigation_items_caption_background_color',
        'label'       => 'Navigation Items Labels background color',
        'desc'        => 'Select the background color for the item menu labels.',
        'std'         => '',
        'type'        => 'colorpicker',
        'section'     => 'lumen_main_menu',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_menu_labels',
        'label'       => 'Navigation Items Labels typography',
        'desc'        => 'Select the typography for the main menu labels.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_main_menu',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_contact_email',
        'label'       => 'Contact E-Mail',
        'desc'        => 'Enter your public contact E-Mail. It will be visible to your visitors on the <strong>Contact</strong> section.',
        'std'         => '',
        'type'        => 'text',
        'section'     => 'lumen_section_contact_info',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_contact_form_id',
        'label'       => 'Contact Form 7 ID',
        'desc'        => 'Enter your Contact Form 7 form ID.',
        'std'         => '',
        'type'        => 'text',
        'section'     => 'lumen_section_contact_info',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_contact_photo',
        'label'       => 'Contact Page photo',
        'desc'        => 'Upload a photo to show on your contact page.',
        'std'         => '',
        'type'        => 'upload',
        'section'     => 'lumen_section_contact_info',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_contact_circular_photo',
        'label'       => 'Circular Photo',
        'desc'        => 'Activate this option to wrap your photo around a circle.',
        'std'         => '',
        'type'        => 'checkbox',
        'section'     => 'lumen_section_contact_info',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'choices'     => array( 
          array(
            'value'       => 'Yes',
            'label'       => 'Wrap your Contact Page photo around a circle',
            'src'         => ''
          )
        ),
      ),
      array(
        'id'          => 'lumen_contact_photo_size',
        'label'       => 'Contact Page photo size',
        'desc'        => 'Choose the size for the contact page photo (in pixels).',
        'std'         => '200',
        'type'        => 'select',
        'section'     => 'lumen_section_contact_info',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'choices'     => array( 
          array(
            'value'       => '200',
            'label'       => '200px',
            'src'         => ''
          ),
          array(
            'value'       => '220',
            'label'       => '220px',
            'src'         => ''
          ),
          array(
            'value'       => '240',
            'label'       => '240px',
            'src'         => ''
          ),
          array(
            'value'       => '260',
            'label'       => '260px',
            'src'         => ''
          ),
          array(
            'value'       => '280',
            'label'       => '280px',
            'src'         => ''
          ),
          array(
            'value'       => '300',
            'label'       => '300px',
            'src'         => ''
          ),
          array(
            'value'       => '320',
            'label'       => '320px',
            'src'         => ''
          ),
          array(
            'value'       => '340',
            'label'       => '340px',
            'src'         => ''
          ),
          array(
            'value'       => '360',
            'label'       => '360px',
            'src'         => ''
          ),
          array(
            'value'       => '380',
            'label'       => '380px',
            'src'         => ''
          ),
          array(
            'value'       => '400',
            'label'       => '400px',
            'src'         => ''
          )
        ),
      ),
      array(
        'id'          => 'lumen_typography_primary',
        'label'       => 'Site Primary Typography',
        'desc'        => 'Default typography for pages content, post and works dates, photos captions and lists. Also, posts content and comments and works content default to this font (if no other typography is indicated for these elements). <strong>Theme default: Noto Serif</strong>.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_secondary',
        'label'       => 'Site Secondary Typography',
        'desc'        => 'Affects menu items, buttons, headings, works titles, works descriptions, categories filters, contact form labels. <strong>Theme default: Raleway</strong>.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h1',
        'label'       => 'Heading 1 (H1)',
        'desc'        => 'Change the H1 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h2',
        'label'       => 'Heading 2 (H2)',
        'desc'        => 'Change the H2 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h3',
        'label'       => 'Heading 3 (H3)',
        'desc'        => 'Change the H3 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h4',
        'label'       => 'Heading 4 (H4)',
        'desc'        => 'Change the H4 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h5',
        'label'       => 'Heading 5 (H5)',
        'desc'        => 'Change the H5 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_typography_h6',
        'label'       => 'Heading 6 (H6)',
        'desc'        => 'Change the H6 default typography.',
        'std'         => '',
        'type'        => 'typography',
        'section'     => 'lumen_typography',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_custom_css',
        'label'       => 'Lumen Custom CSS',
        'desc'        => 'Enter custom styles for your site.',
        'std'         => '',
        'type'        => 'css',
        'section'     => 'lumen_custom_code',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_custom_script',
        'label'       => 'Lumen Custom Script',
        'desc'        => 'Enter custom scripts for your site.',
        'std'         => '',
        'type'        => 'textarea-simple',
        'section'     => 'lumen_custom_code',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),
      array(
        'id'          => 'lumen_options_css',
        'label'       => 'Lumen Options CSS',
        'desc'        => 'This code links your theme options to your site styles. It should not be edited.',
        'std'         => '/* Primary typography */
body, .widget_calendar caption, .noresults-page p, #toggle-sidebar, #toggle-categories {
  {{lumen_typography_primary}}
}

/* Secondary typography */
.widget, .pricing-table .price small, .post-date span.date, .tags span, .toggle-comments, #respond h3 a, .logged-in-as, .logged-in-as a, .work-title span.date {
  {{lumen_typography_secondary}}
}

h1 { {{lumen_typography_h1}} }
h2 { {{lumen_typography_h2}} }
h3 { {{lumen_typography_h3}} }
h4 { {{lumen_typography_h4}} }
h5 { {{lumen_typography_h5}} }
h6 { {{lumen_typography_h6}} }

.post-content p {
  {{lumen_typography_post_content}}
}
.work-content p {
  {{lumen_typography_work_content}}
}
.main-nav a { {{lumen_typography_menu_labels}} }',
        'type'        => 'css',
        'section'     => 'lumen_custom_code',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      )
    )
  );
  
  /* allow settings to be filtered before saving */
  $custom_settings = apply_filters( 'option_tree_settings_args', $custom_settings );
  
  /* settings are not the same update the DB */
  if ( $saved_settings !== $custom_settings ) {
    update_option( 'option_tree_settings', $custom_settings ); 
  }
  
}