# Surrender - Angular UI
## Theme Service
This service allows an entire application to toggle between multiple styles.  With well defined styles, you could easily apply styles globally or by nesting IDs if desired for more control.  The
application of styles is based upon html element IDs.
<br />See:
- /Surrender/src/styles.scss
- /Surrender/src/app/services/theme.service.ts

## Navbar Component
This component is indended to be a heads-up display capturing critical
information pertaining to the application's current run state.  
<br />This navbar contains: 
<br />Branding:  Ability to display brand image and brand text.  Clicking on
the brand image allows for the display of a menu.  The brand menu
items, brand image, and brand text are populated via the navbar
service.  callback support for menu options are executed directly, 
and is expected to have callback defined elsewhere (IE a service?)
<br />See:
- Surrender/src/app/common-ui/navbar/navbar.component.ts

## Navbar Service
This navbar service allows for a re-user to customize the brand image,
the brand text, and the corresponding dropdown menu that generates from
clicking the brand image.  
<br />The menu items allow for the re-user to specify specific functionality 
assigned to a menu item.  These callback functions must be passed into the 
menu items.  The menu items don't require an icon to be define
<br />See:
- /Surrender/src/app/services/navbar.service.ts

## Misc.
### Picklist Modal
This modal is a simple implementation to allow for a modal to ask the user to
make a selection.  This allows for the definition of: the list, the modal title,
the current selection, and the close modal display text.
<br /> See:
- /Surrender/src/app/common-us/modals/picklist-modal.component.ts